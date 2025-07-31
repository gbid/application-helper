use crate::model::GeneratedHeadshotId;
use crate::model::HeadshotGeneration;
use crate::model::HeadshotGenerationId;
use crate::model::HeadshotGenerationImage;
use crate::model::HeadshotGenerationListItem;
use crate::model::UserId;
use sqlx::PgPool;

pub async fn get_favourite_headshots(
    db: &sqlx::PgPool,
    user_id: UserId,
) -> sqlx::Result<Vec<GeneratedHeadshotId>> {
    let ids = sqlx::query_scalar!(
        r#"
        SELECT headshot_generation_headshot_generated_id
        FROM headshot_generation_headshot_generated
        WHERE user_id = $1 AND is_favourite = true
        "#,
        user_id.user_id,
    )
    .fetch_all(db)
    .await?;

    Ok(ids
        .into_iter()
        .map(|id| GeneratedHeadshotId {
            generated_headshot_id: id,
        })
        .collect())
}

pub async fn set_favourite(
    db: &sqlx::PgPool,
    user_id: UserId,
    image_id: GeneratedHeadshotId,
    is_favourite: bool,
) -> sqlx::Result<()> {
    sqlx::query!(
        r#"
        UPDATE headshot_generation_headshot_generated
        SET is_favourite = $3
        WHERE headshot_generation_headshot_generated_id = $1
        AND user_id = $2
        "#,
        image_id.generated_headshot_id,
        user_id.user_id,
        is_favourite,
    )
    .execute(db)
    .await?;

    Ok(())
}

pub async fn list_headshot_generations(
    db: &PgPool,
    UserId { user_id }: UserId,
) -> Vec<HeadshotGenerationListItem> {
    let result = sqlx::query!(
        r#"
        SELECT 
            headshot_generation_id,
            created_at
        FROM headshot_generation
        WHERE user_id = $1
        ORDER BY created_at DESC
        "#,
        user_id,
    )
    .fetch_all(db)
    .await
    .expect("Database must be available");

    result
        .into_iter()
        .map(|row| HeadshotGenerationListItem {
            headshot_generation_id: HeadshotGenerationId {
                headshot_generation_id: row.headshot_generation_id,
            },
            created_at: row.created_at,
        })
        .collect()
}

pub async fn create_headshot_generation(
    db: &PgPool,
    UserId { user_id }: UserId,
    trigger_word: &str,
) -> HeadshotGenerationId {
    let headshot_generation_id = sqlx::query_scalar!(
        r#"
        INSERT INTO headshot_generation (
            user_id,
            trigger_word
        )
        VALUES ($1, $2)
        RETURNING headshot_generation_id
        "#,
        user_id,
        trigger_word,
    )
    .fetch_one(db)
    .await
    .expect("Database must be available");

    HeadshotGenerationId {
        headshot_generation_id,
    }
}

pub async fn save_uploaded_images(
    db: &PgPool,
    UserId { user_id }: UserId,
    HeadshotGenerationId {
        headshot_generation_id,
    }: HeadshotGenerationId,
    images: &[HeadshotGenerationImage],
) {
    for image in images {
        sqlx::query!(
            r#"
            INSERT INTO headshot_generation_image_uploaded (
                headshot_generation_id,
                byte_content,
                filename,
                user_id
            )
            VALUES ($1, $2, $3, $4)
            "#,
            headshot_generation_id,
            image.byte_content,
            image.filename,
            user_id,
        )
        .execute(db)
        .await
        .expect("Database must be available");
    }
}

pub async fn get_uploaded_images(
    db: &PgPool,
    UserId { user_id }: UserId,
    HeadshotGenerationId {
        headshot_generation_id,
    }: HeadshotGenerationId,
) -> Vec<HeadshotGenerationImage> {
    sqlx::query!(
        r#"
        SELECT byte_content, filename
        FROM headshot_generation_image_uploaded
        WHERE headshot_generation_id = $1
        AND user_id = $2
        ORDER BY filename
        "#,
        headshot_generation_id,
        user_id,
    )
    .fetch_all(db)
    .await
    .expect("Database must be available")
    .into_iter()
    .map(|row| HeadshotGenerationImage {
        filename: row.filename,
        byte_content: row.byte_content,
    })
    .collect()
}

pub async fn save_generated_headshots(
    db: &PgPool,
    UserId { user_id }: UserId,
    HeadshotGenerationId {
        headshot_generation_id,
    }: HeadshotGenerationId,
    images: &[&[u8]],
    replicate_prediction_id: &str,
    seed: i32,
    prompt: &str,
) -> Result<Vec<GeneratedHeadshotId>, sqlx::Error> {
    let mut transaction = db.begin().await?;

    let mut image_ids = Vec::new();

    for image in images {
        let generated_headshot_id = sqlx::query_scalar!(
            r#"
            INSERT INTO headshot_generation_headshot_generated (
                headshot_generation_id,
                byte_content,
                replicate_prediction_id,
                seed,
                prompt,
                user_id
            )
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING headshot_generation_headshot_generated_id
            "#,
            headshot_generation_id,
            image,
            replicate_prediction_id,
            seed,
            prompt,
            user_id,
        )
        .fetch_one(&mut *transaction)
        .await?;

        image_ids.push(GeneratedHeadshotId {
            generated_headshot_id,
        });
    }

    transaction.commit().await?;

    Ok(image_ids)
}

pub async fn get_generated_headshot(
    db: &PgPool,
    UserId { user_id }: UserId,
    GeneratedHeadshotId {
        generated_headshot_id,
    }: GeneratedHeadshotId,
) -> Option<Vec<u8>> {
    sqlx::query_scalar!(
        r#"
        SELECT byte_content
        FROM headshot_generation_headshot_generated
        WHERE headshot_generation_headshot_generated_id = $1
        AND user_id = $2
        "#,
        generated_headshot_id,
        user_id,
    )
    .fetch_optional(db)
    .await
    .expect("Database must be available")
}

pub async fn save_replicate_version_id(
    db: &PgPool,
    UserId { user_id }: UserId,
    HeadshotGenerationId {
        headshot_generation_id,
    }: HeadshotGenerationId,
    version_id: &str,
) -> Result<(), sqlx::Error> {
    sqlx::query!(
        r#"
        UPDATE headshot_generation
        SET replicate_version_id = $1
        WHERE headshot_generation_id = $2
        AND user_id = $3
        "#,
        version_id,
        headshot_generation_id,
        user_id,
    )
    .execute(db)
    .await?;

    Ok(())
}

pub async fn get_headshot_generation(
    db: &PgPool,
    UserId { user_id }: UserId,
    HeadshotGenerationId {
        headshot_generation_id,
    }: HeadshotGenerationId,
) -> Option<HeadshotGeneration> {
    let record = sqlx::query!(
        r#"
        SELECT headshot_generation_id, trigger_word, replicate_version_id
        FROM headshot_generation
        WHERE headshot_generation_id = $1
        AND user_id = $2
        "#,
        headshot_generation_id,
        user_id,
    )
    .fetch_optional(db)
    .await
    .expect("Database must be available")?;

    let generated_headshot_ids = sqlx::query!(
        r#"
        SELECT headshot_generation_headshot_generated_id
        FROM headshot_generation_headshot_generated
        WHERE headshot_generation_id = $1
        AND user_id = $2
        ORDER BY created_at
        "#,
        headshot_generation_id,
        user_id,
    )
    .fetch_all(db)
    .await
    .expect("Database must be available")
    .into_iter()
    .map(|row| GeneratedHeadshotId {
        generated_headshot_id: row.headshot_generation_headshot_generated_id,
    })
    .collect();

    Some(HeadshotGeneration {
        headshot_generation_id: record.headshot_generation_id,
        trigger_word: record.trigger_word,
        replicate_version_id: record.replicate_version_id,
        generated_headshot_ids,
    })
}
