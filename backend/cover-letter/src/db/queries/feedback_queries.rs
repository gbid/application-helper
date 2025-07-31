use crate::model::UserId;
use sqlx::{Executor, Postgres};

/// Saves user feedback to the database
/// together with the user id.
pub async fn insert_feedback(
    user_id: &UserId,
    feedback: &str,
    exec: impl Executor<'_, Database = Postgres>,
) -> Result<(), sqlx::Error> {
    let UserId { user_id } = user_id;
    sqlx::query! {"
        INSERT
            INTO feedback (user_id, feedback)
            VALUES ($1, $2);
        ", user_id, feedback }
    .execute(exec)
    .await?;
    Ok(())
}
