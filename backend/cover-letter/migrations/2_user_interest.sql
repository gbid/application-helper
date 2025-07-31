create table user_interest (
    email text collate "case_insensitive" unique not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz
);
select trigger_updated_at('"user_interest"');
