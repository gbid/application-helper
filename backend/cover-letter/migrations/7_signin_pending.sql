CREATE TABLE signin_pending (
    user_id uuid not null references user_table (user_id) on delete cascade,
    -- The secret token that was sent to the user's email that allows signin.
    token TEXT NOT NULL ,
    created_at timestamptz not null default now(),
    updated_at timestamptz
);
SELECT trigger_updated_at('"signin_pending"');
