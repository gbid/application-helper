-- TODO: add more variants
CREATE TYPE interview_question_type AS ENUM (
	'Behavioral',
	'Technical',
	'Background'
);

CREATE TABLE interview_question (
		interview_question_id uuid primary key not null default uuid_generate_v1mc(),
    user_id UUID NOT NULL REFERENCES user_table (user_id) ON DELETE CASCADE,
		application_id uuid NOT NULL REFERENCES application(application_id) ON DELETE CASCADE,
		interview_question_type interview_question_type NOT NULL,
		text_content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);
SELECT trigger_updated_at('interview_question');
