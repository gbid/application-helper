use crate::chat::initial_chat_log;
use crate::model::{ApplicationId, ChatLog, ChatLogEntry, ChatRole, ImageUrl, UserId};
use crate::queries::FromDbString;
use crate::queries::ToDbString;
use sqlx;

pub async fn get_chat_log(
    db: &mut sqlx::PgConnection,
    user_id: &UserId,
    application_id: &ApplicationId,
) -> Result<Option<ChatLog>, sqlx::Error> {
    let rows = sqlx::query!(
        r#"
        SELECT role, content, image_url
        FROM chat_log
        WHERE application_id = $1
        AND user_id = $2
        ORDER BY id
        "#,
        application_id.application_id,
        user_id.user_id,
    )
    .fetch_all(&mut *db)
    .await?;

    let chat_log: Vec<ChatLogEntry> = rows
        .into_iter()
        .map(|row| {
            let role = ChatRole::from_db_string(row.role.as_str());
            let content = row.content;
            let image_url = row.image_url.map(|url| ImageUrl { url });
            ChatLogEntry {
                role,
                content,
                image_url,
            }
        })
        .collect();

    if chat_log.is_empty() {
        return Ok(None);
    }

    let chat_log = ChatLog { chat_log };

    Ok(Some(chat_log))
}

pub async fn push_chat_log_entry(
    db: &mut sqlx::PgConnection,
    user_id: &UserId,
    application_id: &ApplicationId,
    chat_log_entry: ChatLogEntry,
) -> Result<(), sqlx::Error> {
    let ChatLogEntry {
        role,
        content,
        image_url,
    } = chat_log_entry;

    sqlx::query!(
        r#"
        INSERT INTO chat_log (application_id, user_id, role, content, image_url)
        VALUES ($1, $2, $3, $4, $5)
        "#,
        application_id.application_id,
        user_id.user_id,
        role.to_db_string(),
        content,
        image_url.map(|url| url.url),
    )
    .execute(&mut *db)
    .await?;

    Ok(())
}

pub async fn insert_new_chat_log(
    db: &mut sqlx::PgConnection,
    user_id: &UserId,
    application_id: &ApplicationId,
) -> Result<(), sqlx::Error> {
    let chat_log = initial_chat_log();
    if get_chat_log(db, user_id, application_id).await?.is_some() {
        panic!("Chat log already exists for user and application");
    }
    for chat_log_entry in chat_log.chat_log {
        push_chat_log_entry(db, user_id, application_id, chat_log_entry).await?;
    }
    Ok(())
}

pub async fn get_chat_log_or_insert_new(
    db: &mut sqlx::PgConnection,
    user_id: &UserId,
    application_id: &ApplicationId,
) -> Result<ChatLog, sqlx::Error> {
    match get_chat_log(db, user_id, application_id).await? {
        Some(chat_log) => Ok(chat_log),
        None => {
            insert_new_chat_log(db, user_id, application_id).await?;
            let chat_log = get_chat_log(db, user_id, application_id)
                .await?
                .expect("Chat log should exist after insertion");
            Ok(chat_log)
        }
    }
}
