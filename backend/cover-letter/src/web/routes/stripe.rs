use crate::core::app_state::AppState;
use crate::core::model;
use crate::credentials;
use crate::db::queries;
use crate::web::session::Session;
use crate::ROOT_URL;
use axum::response::ErrorResponse;
use axum::{extract::State, response, routing, Router};
use stripe::{
    CheckoutSession, CreateCheckoutSession, CreateCheckoutSessionLineItems,
    CreateCheckoutSessionPaymentMethodTypes, CustomerId, EventObject, Webhook,
};

async fn create_stripe_customer(
    stripe_client: &stripe::Client,
    user_email: lettre::Address,
    user_id: &model::UserId,
    db: &sqlx::PgPool,
) -> Result<stripe::Customer, stripe::StripeError> {
    let customer = stripe::Customer::create(
        stripe_client,
        stripe::CreateCustomer {
            email: Some(user_email.to_string().as_str()),
            metadata: Some(std::collections::HashMap::from([(
                "user_id".to_string(),
                user_id.user_id.to_string(),
            )])),
            ..Default::default()
        },
    )
    .await?;
    queries::set_stripe_customer_id(user_id, &customer.id, db)
        .await
        .unwrap();

    Ok(customer)
}

// TODO: specify error responses
async fn create_checkout_session(
    State(state): State<AppState>,
    Session { user_id, .. }: Session,
) -> response::Result<response::Redirect> {
    let stripe_customer_id = queries::get_stripe_customer_id(&user_id, &state.db)
        .await
        .unwrap();
    let stripe_customer_id = match stripe_customer_id {
        Some(id) => id,
        None => {
            let email = queries::get_email_address(user_id, &state.db)
                .await
                .unwrap()
                .expect("Session extractor should ensure user has email");
            let customer = create_stripe_customer(&state.stripe_client, email, &user_id, &state.db)
                .await
                .unwrap();
            customer.id
        }
    };

    // TODO: move this to some central place for constants / configs?
    #[cfg(feature = "production")]
    let price_id = "price_1Pg8VSIU28C8XgqYHxiv6mGt";
    #[cfg(feature = "integration")]
    let price_id = "price_1Pg8VSIU28C8XgqYHxiv6mGt";
    #[cfg(all(not(feature = "production"), not(feature = "integration")))]
    let price_id = "price_1PVVy2IU28C8XgqY9kfmYNpp";

    let checkout_session = CheckoutSession::create(
        &state.stripe_client,
        CreateCheckoutSession {
            line_items: Some(vec![CreateCheckoutSessionLineItems {
                price: Some(price_id.to_string()),
                quantity: Some(1),
                ..Default::default()
            }]),
            mode: Some(stripe::CheckoutSessionMode::Subscription),
            success_url: Some(format!("{}/subscription-success", ROOT_URL).as_str()),
            cancel_url: Some(format!("{}/pricing-plans", ROOT_URL).as_str()),
            payment_method_types: Some(vec![
                CreateCheckoutSessionPaymentMethodTypes::Card,
                CreateCheckoutSessionPaymentMethodTypes::Paypal,
            ]),
            locale: Some(stripe::CheckoutSessionLocale::De),
            // This identifies the user for our database when stripe calls our webhook including
            // this client_reference_id.
            client_reference_id: Some(user_id.user_id.to_string().as_str()),
            // prefill the email address in the checkout session
            customer: Some(stripe_customer_id.parse().unwrap()),
            ..Default::default()
        },
    )
    .await
    .map_err(|e| {
        eprintln!("Failed to create checkout session: {:?}", e);
        axum::http::StatusCode::INTERNAL_SERVER_ERROR
    })?;

    let checkout_session_url = checkout_session.url.ok_or_else(|| {
        eprintln!("Missing url in stripe CheckoutSession response");
        axum::http::StatusCode::INTERNAL_SERVER_ERROR
    })?;

    Ok(response::Redirect::temporary(&checkout_session_url))
}

async fn create_customer_portal_session(
    State(state): State<AppState>,
    Session { user_id, .. }: Session,
) -> response::Result<response::Redirect> {
    let stripe_customer_id = queries::get_stripe_customer_id(&user_id, &state.db)
        .await
        .unwrap()
        .unwrap();

    let session = stripe::BillingPortalSession::create(
        &state.stripe_client,
        stripe::CreateBillingPortalSession {
            customer: stripe_customer_id.parse().unwrap(),
            return_url: Some(format!("{}/pricing-plans", ROOT_URL).as_str()),
            configuration: None,
            expand: &[],
            flow_data: None,
            locale: Some(stripe::BillingPortalSessionLocale::De),
            on_behalf_of: None,
        },
    )
    .await
    .unwrap();
    Ok(response::Redirect::temporary(&session.url))
}

async fn webhook(
    State(state): State<AppState>,
    headers: axum::http::HeaderMap,
    body: String,
) -> response::Result<()> {
    let stripe_signature = headers
        .get("Stripe-Signature")
        .and_then(|v| v.to_str().ok())
        .unwrap_or("");

    let event =
        match Webhook::construct_event(&body, stripe_signature, credentials::STRIPE_WEBHOOK_SECRET)
        {
            Ok(event) => event,
            Err(e) => {
                eprintln!("Failed to parse webhook event: {:?}", e);
                return Err(axum::http::StatusCode::BAD_REQUEST.into());
            }
        };
    match event.type_ {
        stripe::EventType::CheckoutSessionCompleted => {
            let session = match event.data.object {
                EventObject::CheckoutSession(session) => session,
                _ => {
                    eprintln!("Unexpected object type for CheckoutSessionCompleted event");
                    return Err(axum::http::StatusCode::BAD_REQUEST.into());
                }
            };
            let client_reference_id = session.client_reference_id.ok_or_else(|| {
                eprintln!("Missing client_reference_id in CheckoutSessionCompleted event");
                axum::http::StatusCode::BAD_REQUEST
            })?;

            let user_id = uuid::Uuid::parse_str(&client_reference_id).map_err(|e| {
                eprintln!("Failed to parse client_reference_id: {:?}", e);
                axum::http::StatusCode::BAD_REQUEST
            })?;

            let user_id = model::UserId { user_id };

            let customer = session.customer.ok_or_else(|| {
                eprintln!("Missing customer in CheckoutSessionCompleted event");
                axum::http::StatusCode::BAD_REQUEST
            })?;

            let customer_id = customer.id();

            update_user_subscription_active(
                &state.db,
                user_id,
                customer_id,
                model::SubscriptionStatus::Active,
            )
            .await
            .map_err(|e| {
                eprintln!("Failed to add user subscription: {:?}", e);
                axum::http::StatusCode::INTERNAL_SERVER_ERROR
            })?;
        }
        stripe::EventType::CustomerSubscriptionDeleted => {
            let subscription = match event.data.object {
                EventObject::Subscription(subscription) => subscription,
                _ => {
                    eprintln!("Unexpected object type for CustomerSubscriptionDeleted event");
                    return Err(axum::http::StatusCode::BAD_REQUEST.into());
                }
            };
            let customer_id = subscription.customer.id();
            let user: Option<model::UserId> =
                queries::get_user_by_stripe_customer_id(&customer_id, &state.db)
                    .await
                    .map_err(|e| {
                        eprintln!(
                            "Failed to find user for customer id {:?}: {:?}",
                            customer_id, e
                        );
                        ErrorResponse::from(axum::http::StatusCode::INTERNAL_SERVER_ERROR)
                    })?;
            let user: model::UserId = user.ok_or_else(|| {
                eprintln!("Failed to find user for customer id: {:?}", customer_id);
                ErrorResponse::from(axum::http::StatusCode::GONE)
            })?;
            update_user_subscription_ended(
                &state.db,
                user.user_id,
                model::SubscriptionStatus::Inactive,
            )
            .await
            .map_err(|e| {
                eprintln!("Failed to remove user subscription: {:?}", e);
                ErrorResponse::from(axum::http::StatusCode::INTERNAL_SERVER_ERROR)
            })?;
        }
        _ => {
            eprintln!("Unhandled event type: {:?}", event.type_);
            return Err(axum::http::StatusCode::BAD_REQUEST.into());
        }
    }

    Ok(())
}

async fn update_user_subscription_active(
    db: &sqlx::PgPool,
    user_id: model::UserId,
    customer_id: CustomerId,
    status: model::SubscriptionStatus,
) -> Result<(), sqlx::Error> {
    sqlx::query!(
        "UPDATE
            user_table
        SET
            stripe_customer_id = $1,
            subscription_status = $2
        WHERE
            user_id = $3",
        customer_id.as_str(),
        status as model::SubscriptionStatus,
        user_id.user_id
    )
    .execute(db)
    .await?;

    Ok(())
}

async fn update_user_subscription_ended(
    db: &sqlx::PgPool,
    user_id: uuid::Uuid,
    status: model::SubscriptionStatus,
) -> Result<(), sqlx::Error> {
    sqlx::query!(
        "UPDATE user_table SET subscription_status = $1 WHERE user_id = $2",
        status as model::SubscriptionStatus,
        user_id
    )
    .execute(db)
    .await?;

    Ok(())
}

pub fn stripe_router() -> Router<AppState> {
    Router::new()
        .route(
            "/create-checkout-session",
            routing::get(create_checkout_session),
        )
        .route(
            "/create-customer-portal-session",
            routing::get(create_customer_portal_session),
        )
        .route("/webhook", routing::post(webhook))
}
