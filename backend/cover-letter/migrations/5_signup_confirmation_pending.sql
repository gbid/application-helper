CREATE TABLE signup_confirmation_pending (
    user_id uuid not null references user_table (user_id) on delete cascade,
    -- The secret token that was sent to the user's email to confirm the
    -- registration.
    token TEXT NOT NULL UNIQUE,
    created_at timestamptz not null default now(),
    updated_at timestamptz
);
select trigger_updated_at('"signup_confirmation_pending"');
