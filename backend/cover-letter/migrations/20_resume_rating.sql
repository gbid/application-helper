CREATE TABLE resume_rating (
		resume_rating_id uuid primary key DEFAULT uuid_generate_v1mc(),
    user_id uuid NOT NULL references user_table (user_id) on delete cascade,
		application_id uuid NOT NULL references application (application_id) on delete cascade,
    category TEXT NOT NULL,
    rating INTEGER NOT NULL,
    strengths TEXT NOT NULL,
		improvements TEXT NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz
);
SELECT trigger_updated_at('"resume_rating"');
