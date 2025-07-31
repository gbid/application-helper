CREATE TABLE headshot (
    headshot_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    byte_content BYTEA NOT NULL,
    content_type TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ,
    FOREIGN KEY (user_id) REFERENCES user_table(user_id) ON DELETE CASCADE
);

-- Add headshot_id to application_parameters
ALTER TABLE application_parameters
ADD COLUMN headshot_id UUID,
ADD FOREIGN KEY (headshot_id) REFERENCES headshot(headshot_id);
