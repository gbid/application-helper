CREATE TABLE template_cover_letter_used_for_generation (
 		template_cover_letter_id uuid NOT NULL REFERENCES template_cover_letter (template_cover_letter_id) on delete cascade,
    user_id UUID NOT NULL REFERENCES user_table (user_id) ON DELETE CASCADE,
		cover_letter_generation_id uuid NOT NULL REFERENCES cover_letter_generation (cover_letter_generation_id) on delete cascade,
    PRIMARY KEY (template_cover_letter_id, cover_letter_generation_id),
		created_at timestamptz not null default now(),
		updated_at timestamptz
);
SELECT trigger_updated_at('"template_cover_letter_used_for_generation"');
