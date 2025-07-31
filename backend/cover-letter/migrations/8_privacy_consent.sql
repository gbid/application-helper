CREATE TABLE privacy_consent (
    user_id uuid not null references user_table (user_id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz
);
SELECT trigger_updated_at('"privacy_consent"');
