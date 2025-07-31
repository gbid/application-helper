use crate::core::app_state::*;

use crate::core::model::UserType;
use crate::web::session::*;

use axum::response;
use axum::routing;
use axum::Router;

async fn get_user_type(session: Option<AnonymousSession>) -> response::Json<Option<UserType>> {
    match session {
        Some(session) => response::Json(Some(session.user_type)),
        None => response::Json(None),
    }
}

pub fn user_type_router() -> Router<AppState> {
    Router::new().route("/", routing::get(get_user_type))
}
