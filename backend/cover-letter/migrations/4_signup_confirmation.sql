CREATE TABLE signup_confirmation (
    user_id uuid not null references user_table (user_id) on delete cascade,
    created_at timestamptz not null default now(),
    updated_at timestamptz
);
select trigger_updated_at('signup_confirmation');
