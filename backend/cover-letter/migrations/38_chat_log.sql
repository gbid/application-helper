BEGIN;

CREATE TABLE chat_log (
		-- used to preserve the order of the chat messages
    id SERIAL PRIMARY KEY,
    application_id UUID NOT NULL REFERENCES application(application_id) ON DELETE CASCADE,
		user_id UUID NOT NULL REFERENCES user_table(user_id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

COMMIT;
