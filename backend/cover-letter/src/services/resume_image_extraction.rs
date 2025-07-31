use crate::core::error::{Error, LogErrAndFatal};
use crate::core::model::ChatLog;
use crate::core::model::Headshot;
use crate::core::model::HeadshotContentType;
use crate::core::model::{ApplicationParameters, RevisionId, UserId};
use crate::db::queries;
use crate::integrations::prompting::classify_image;
use crate::utils::document::extract_images_from_document;
use strum_macros::{Display, EnumIter, EnumString};

#[derive(Debug, Clone, Copy, PartialEq, Eq, EnumString, Display, EnumIter)]
enum ImageType {
    Headshot,
    Signature,
}

pub struct Signature {
    pub image_data: Vec<u8>,
}

async fn scrape_headshot_and_signature_from_document(
    document: &[u8],
) -> Result<(Option<Headshot>, Option<Signature>), Error> {
    let mut headshot = None;
    let mut signature = None;

    let images = extract_images_from_document(document).await?;

    for image in images.into_iter() {
        let image_type: Option<ImageType> = classify_image(&image, &mut ChatLog::new())
            .await
            .unwrap_or_else(|e| {
                eprintln!("Failed to classify image: {}", e);
                None
            });
        match image_type {
            Some(ImageType::Headshot) => {
                if headshot.is_some() {
                    // TODO: handle multiple headshots properly
                    continue;
                }
                headshot = Some(Headshot {
                    image_data: image,
                    content_type: HeadshotContentType::Jpeg,
                });
            }
            Some(ImageType::Signature) => {
                if signature.is_some() {
                    // TODO: handle multiple signatures properly
                    continue;
                }
                signature = Some(Signature { image_data: image });
            }
            None => {
                continue;
            }
        }
    }
    Ok((headshot, signature))
}

pub async fn extract_headshot(
    db: &sqlx::PgPool,
    user_id: UserId,
    revision_id: RevisionId,
) -> Result<Option<Headshot>, Error> {
    let (headshot, _) =
        extract_headshot_and_signature_from_document(db, user_id, revision_id).await?;
    if let Some(headshot) = &headshot {
        let enhanced_headshot = crate::integrations::claid::enhance_and_resize_image(
            headshot.image_data.clone(),
            "headshot",
        )
        .await;
        if let Ok(enhanced_headshot) = enhanced_headshot {
            return Ok(Some(Headshot {
                image_data: enhanced_headshot,
                content_type: headshot.content_type,
            }));
        }
    }
    Ok(headshot)
}

pub async fn extract_signature(
    db: &sqlx::PgPool,
    user_id: UserId,
    revision_id: RevisionId,
) -> Result<Option<Signature>, Error> {
    let (_, signature) =
        extract_headshot_and_signature_from_document(db, user_id, revision_id).await?;
    Ok(signature)
}

async fn extract_headshot_and_signature_from_document(
    db: &sqlx::PgPool,
    user_id: UserId,
    revision_id: RevisionId,
) -> Result<(Option<Headshot>, Option<Signature>), Error> {
    let application_parameters: Option<ApplicationParameters> =
        queries::get_parameters(db, user_id, revision_id)
            .await
            .log_and_fatal()?;

    let Some(application_parameters) = application_parameters else {
        return Ok((None, None));
    };
    let Some(resume_id) = application_parameters.resume_id else {
        return Ok((None, None));
    };

    let resume = match queries::get_resume(&user_id, &resume_id, db)
        .await
        .log_and_fatal()?
    {
        Some((_, resume)) => resume,
        None => return Ok((None, None)),
    };

    let (headshot, signature) = scrape_headshot_and_signature_from_document(&resume).await?;

    Ok((headshot, signature))
}
