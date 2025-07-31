use crate::core::app_state::AppState;
use crate::core::error::Error;
use crate::core::model::GeneratedHeadshotId;
use crate::core::model::HeadshotGeneratedFavouriteInfo;
use crate::core::model::HeadshotGeneration;
use crate::core::model::HeadshotGenerationId;
use crate::core::model::HeadshotGenerationImage;
use crate::core::model::HeadshotGenerationListItem;
use crate::core::model::UserId;
use crate::db::queries;
use crate::integrations::replicate;
use crate::integrations::replicate::GeneratedImagesWithPredictionId;
use crate::web::server_sent_event_importai::sse_stream_response;
use crate::web::session::Session;
use axum::extract::{DefaultBodyLimit, Multipart, Path, State};
use axum::response;
use axum::response::Response;
use axum::routing::get;
use axum::Json;
use axum::Router;
use futures::future::join_all;
use serde::Serialize;
use tokio::time::sleep;
use tokio_stream::wrappers::ReceiverStream;
use ts_rs::TS;
use uuid::Uuid;

#[derive(Debug, Serialize, TS)]
#[ts(export)]
#[serde(tag = "kind")]
#[serde(rename_all = "camelCase")]
pub enum HeadshotGenerationProgress {
    Preparing,
    Training { progress: Option<f32> },
    Predicting,
    Complete { image_ids: Vec<GeneratedHeadshotId> },
    Error,
}

const TRIGGER_WORD: &str = "USRHS";
const PROMPT: &str =
    "professional corporate headshot of USRHS, business attire, soft studio lighting, neutral background, high-end DSLR, 85mm lens, professional photo studio, crisp details, perfect exposure";
const MODEL_NAME: &str = "flux-bewerbungshelfer";

pub fn headshot_generation_router() -> Router<AppState> {
    Router::new()
        .route(
            "/",
            axum::routing::post(create_headshot_generation)
                .layer(DefaultBodyLimit::max(250 * 1024 * 1024)),
        )
        .route("/:headshot_generation_id", get(generate_headshot))
        .route(
            "/headshot-generated/:generated_headshot_id",
            get(get_generated_image),
        )
        .route("/list", get(list_headshot_generations))
        .route("/favourites", get(get_favourite_headshots))
        .route(
            "/headshot-generated/:generated_headshot_id/favourite",
            axum::routing::put(set_favourite),
        )
}

async fn get_favourite_headshots(
    State(state): State<AppState>,
    Session { user_id, .. }: Session,
) -> Result<Json<HeadshotGeneratedFavouriteInfo>, Error> {
    let favourite_ids = queries::headshot_generation::get_favourite_headshots(&state.db, user_id)
        .await
        .map_err(|_| Error::Fatal)?;

    Ok(Json(HeadshotGeneratedFavouriteInfo { favourite_ids }))
}

async fn set_favourite(
    State(state): State<AppState>,
    Session { user_id, .. }: Session,
    Path(generated_headshot_id): Path<Uuid>,
    Json(is_favourite): Json<bool>,
) -> Result<(), Error> {
    queries::headshot_generation::set_favourite(
        &state.db,
        user_id,
        GeneratedHeadshotId {
            generated_headshot_id,
        },
        is_favourite,
    )
    .await
    .map_err(|_| Error::Fatal)?;

    Ok(())
}

async fn get_generated_image(
    State(state): State<AppState>,
    Session { user_id, .. }: Session,
    Path(generated_headshot_id): Path<Uuid>,
) -> Result<Vec<u8>, Error> {
    let image_id = GeneratedHeadshotId {
        generated_headshot_id,
    };

    queries::headshot_generation::get_generated_headshot(&state.db, user_id, image_id)
        .await
        .ok_or(Error::Fatal)
}

async fn list_headshot_generations(
    State(state): State<AppState>,
    Session { user_id, .. }: Session,
) -> Result<Json<Vec<HeadshotGenerationListItem>>, Error> {
    let generations =
        queries::headshot_generation::list_headshot_generations(&state.db, user_id).await;

    Ok(Json(generations))
}

#[axum_macros::debug_handler]
async fn create_headshot_generation(
    State(state): State<AppState>,
    // TODO: Get actual user ID from authenticated session
    Session { user_id, .. }: Session,
    multipart: Multipart,
) -> response::Result<Json<HeadshotGenerationId>> {
    let images = process_multipart(multipart).await?;

    // Create generation entry and store uploaded images
    let generation_id =
        queries::headshot_generation::create_headshot_generation(&state.db, user_id, TRIGGER_WORD)
            .await;

    queries::headshot_generation::save_uploaded_images(&state.db, user_id, generation_id, &images)
        .await;
    dbg!(&generation_id);

    Ok(Json(generation_id))
}

// Second endpoint: Handle the actual generation process
async fn generate_headshot(
    State(state): State<AppState>,
    Session { user_id, .. }: Session,
    Path(headshot_generation_id): Path<Uuid>,
) -> Response {
    let (tx, rx) = tokio::sync::mpsc::channel(100);
    let generation_id = HeadshotGenerationId {
        headshot_generation_id,
    };

    tokio::spawn(async move {
        let result = process_headshot_generation(generation_id, user_id, state, tx.clone()).await;
        if let Err(_e) = result {
            let _ = tx.send(HeadshotGenerationProgress::Error).await;
        }
    });

    sse_stream_response(ReceiverStream::new(rx))
}

async fn process_multipart(
    mut multipart: Multipart,
) -> Result<Vec<HeadshotGenerationImage>, Error> {
    let mut images = Vec::new();
    let mut counter = 1;

    while let Some(field) = multipart.next_field().await.map_err(|e| {
        eprintln!("Failed to read multipart field: {e}");
        Error::Fatal
    })? {
        let original_filename = field.file_name().unwrap_or("image.jpg");
        let extension = original_filename
            .rsplit('.')
            .next()
            .expect("filename must have extension");

        let filename = format!("image_{}.{}", counter, extension);

        let data = field.bytes().await.map_err(|e| {
            eprintln!("Failed to read field bytes: {e}");
            Error::Fatal
        })?;

        images.push(HeadshotGenerationImage {
            filename,
            byte_content: data.to_vec(),
        });

        counter += 1;
    }
    Ok(images)
}

fn extract_training_progress(logs: &str) -> Option<f32> {
    logs.lines()
        .filter(|line| line.contains("flux_train_replicate:"))
        .last()
        .and_then(|line| {
            line.split('%').next().and_then(|part| {
                part.trim_start_matches("flux_train_replicate:")
                    .trim()
                    .parse::<f32>()
                    .ok()
            })
        })
}

async fn process_headshot_generation_training(
    training_images: &[HeadshotGenerationImage],
    tx: tokio::sync::mpsc::Sender<HeadshotGenerationProgress>,
) -> Result<String, Error> {
    tx.send(HeadshotGenerationProgress::Preparing)
        .await
        .map_err(|e| {
            eprintln!("Failed to send progress: {e}");
            Error::Fatal
        })?;
    let mut training_response =
        replicate::start_training(MODEL_NAME, &training_images, TRIGGER_WORD).await?;
    tx.send(HeadshotGenerationProgress::Training { progress: None })
        .await
        .map_err(|e| {
            eprintln!("Failed to send progress: {e}");
            Error::Fatal
        })?;

    loop {
        match training_response.status {
            replicate::TrainingResponseStatus::Failed
            | replicate::TrainingResponseStatus::Canceled => return Err(Error::Fatal),
            replicate::TrainingResponseStatus::Starting
            | replicate::TrainingResponseStatus::Processing => {
                sleep(std::time::Duration::from_secs(1)).await
            }
            replicate::TrainingResponseStatus::Succeeded => break,
        }
        training_response = replicate::check_training_status(&training_response.id).await?;
        let training_progress = extract_training_progress(&training_response.logs);

        tx.send(HeadshotGenerationProgress::Training {
            progress: training_progress,
        })
        .await
        .map_err(|e| {
            eprintln!("Failed to send progress: {e}");
            Error::Fatal
        })?;
    }

    let trained_model_version = training_response
        .output
        .expect("Successful training must have output")
        .version
        .expect("Successful training must have version");
    let trained_model_version = trained_model_version
        .split(':')
        .last()
        .expect("Invalid training output");
    Ok(trained_model_version.to_string())
}

async fn process_headshot_generation(
    generation_id: HeadshotGenerationId,
    user_id: UserId,
    state: AppState,
    tx: tokio::sync::mpsc::Sender<HeadshotGenerationProgress>,
) -> Result<(), Error> {
    let generation: HeadshotGeneration =
        queries::headshot_generation::get_headshot_generation(&state.db, user_id, generation_id)
            .await
            .ok_or(Error::Fatal)?;
    if !generation.generated_headshot_ids.is_empty() {
        let progress = HeadshotGenerationProgress::Complete {
            image_ids: generation.generated_headshot_ids,
        };
        tx.send(progress).await.map_err(|e| {
            eprintln!("Failed to send progress: {e}");
            Error::Fatal
        })?;
        return Ok(());
    }

    let uploaded_images =
        queries::headshot_generation::get_uploaded_images(&state.db, user_id, generation_id).await;

    let trained_model_version = match generation.replicate_version_id {
        Some(version_id) => version_id,
        None => {
            let trained_model_version =
                process_headshot_generation_training(&uploaded_images, tx.clone()).await?;
            queries::headshot_generation::save_replicate_version_id(
                &state.db,
                user_id,
                generation_id,
                &trained_model_version,
            )
            .await
            .map_err(|e| {
                eprintln!("Failed to save replicate version ID: {e}");
                Error::Fatal
            })?;
            trained_model_version
        }
    };

    tx.send(HeadshotGenerationProgress::Predicting)
        .await
        .map_err(|e| {
            eprintln!("Failed to send progress: {e}");
            Error::Fatal
        })?;

    let seeds: [i32; 25] = [
        8129381, 1289710, 81, 191273, 0128312, 817, 08734, 8712397, 9117, 89128384, 1227, 91237,
        98126, 892, 8120374, 91261298, 1923912, 87123, 87123912, 971239298, 971239, 791239123,
        973245, 1973123, 7832720,
    ];

    // TODO: do not fail all tasks if one fails.
    // Implement retries instead.
    let prediction_tasks = seeds.into_iter().map(|seed| {
        let trained_model_version = trained_model_version.clone();
        let state = state.clone();
        let generation_id = generation_id;

        tokio::spawn(async move {
            let GeneratedImagesWithPredictionId {
                images,
                replicate_prediction_id,
            } = replicate::create_prediction_and_poll(
                &trained_model_version,
                TRIGGER_WORD,
                PROMPT,
                4,
                seed,
            )
            .await?;

            let image_refs = images.iter().map(|img| img.as_slice()).collect::<Vec<_>>();

            let image_ids = queries::headshot_generation::save_generated_headshots(
                &state.db,
                user_id,
                generation_id,
                &image_refs,
                &replicate_prediction_id,
                seed,
                PROMPT,
            )
            .await
            .map_err(|e| {
                eprintln!("Failed to save generated headshots: {e}");
                Error::Fatal
            })?;

            Ok::<_, Error>(image_ids)
        })
    });

    let results = join_all(prediction_tasks).await;

    let mut image_ids = Vec::new();
    for result in results {
        match result {
            Ok(Ok(ids)) => image_ids.extend(ids),
            Ok(Err(e)) => return Err(e),
            Err(e) => {
                eprintln!("Task join error: {e}");
                return Err(Error::Fatal);
            }
        }
    }

    tx.send(HeadshotGenerationProgress::Complete { image_ids })
        .await
        .map_err(|e| {
            eprintln!("Failed to send progress: {e}");
            Error::Fatal
        })?;

    Ok(())
}
