use crate::model::Headshot;
use crate::model::HeadshotContentType;
use crate::model::HeadshotId;
use crate::model::UserId;
use crate::queries::FromDbString;
use crate::queries::ToDbString;
use sqlx::PgPool;
use uuid::Uuid;

pub async fn save_headshot(
    db: &PgPool,
    UserId { user_id }: UserId,
    headshot: Headshot,
) -> HeadshotId {
    let Headshot {
        image_data,
        content_type,
    } = headshot;

    let image_data_hash = crate::util::hash(&image_data);

    let existing_headshot = sqlx::query_scalar!(
        r#"
        SELECT headshot_id
        FROM headshot
        WHERE
            user_id = $1
            AND byte_content_hash = $2
        "#,
        user_id,
        image_data_hash,
    )
    .fetch_optional(db)
    .await
    .expect("Database must be available");

    if let Some(headshot_id) = existing_headshot {
        HeadshotId { headshot_id }
    } else {
        let headshot_id = sqlx::query_scalar!(
            r#"
            INSERT INTO headshot (user_id, content_type, byte_content, byte_content_hash)
            VALUES ($1, $2, $3, $4)
            RETURNING headshot_id
            "#,
            user_id,
            content_type.to_db_string(),
            image_data,
            image_data_hash,
        )
        .fetch_one(db)
        .await
        .expect("Database must be available");

        HeadshotId { headshot_id }
    }
}

pub async fn get_headshot(db: &PgPool, revision_id: Uuid) -> Option<Headshot> {
    let result = sqlx::query!(
        r#"
        SELECT h.byte_content, h.content_type
        FROM headshot h
        JOIN application_parameters ap ON ap.headshot_id = h.headshot_id
        WHERE ap.revision_id = $1
        "#,
        revision_id
    )
    .fetch_optional(db)
    .await
    .expect("Database must be available");

    result.map(|r| Headshot {
        image_data: r.byte_content,
        content_type: HeadshotContentType::from_db_string(&r.content_type),
    })
}
