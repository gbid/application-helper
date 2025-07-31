CREATE TABLE user_table (
    user_id uuid primary key default uuid_generate_v1mc() not null,
    email text collate "case_insensitive" unique,
    created_at timestamptz not null default now(),
    updated_at timestamptz
);
SELECT trigger_updated_at('user_table');
