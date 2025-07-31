create table feedback (
		feedback_id uuid primary key not null default uuid_generate_v1mc(),
		user_id uuid not null references user_table (user_id),
		feedback text not null,

    created_at timestamptz not null default now(),
    updated_at timestamptz
);
select trigger_updated_at('"feedback"');
