CREATE TYPE cover_letter_generation_status AS ENUM ('NotStarted', 'InProgress', 'Finished', 'Failed');
CREATE TYPE cover_letter_kind AS ENUM ('Standard', 'Original', 'Formal', 'AdaptedFromTemplate');
CREATE TYPE cover_letter_language as ENUM ('English', 'German');

CREATE TABLE cover_letter_generation (
    cover_letter_generation_id uuid primary key NOT NULL default uuid_generate_v1mc(),
    user_id UUID NOT NULL REFERENCES user_table (user_id) ON DELETE CASCADE,
		application_id uuid REFERENCES application (application_id) NOT NULL,
    cover_letter_kind cover_letter_kind NOT NULL,
		cover_letter_language cover_letter_language NOT NULL,
    word_count INTEGER NOT NULL,
    cover_letter_generated TEXT,
    cover_letter_generation_status cover_letter_generation_status NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);
SELECT trigger_updated_at('"cover_letter_generation"');
