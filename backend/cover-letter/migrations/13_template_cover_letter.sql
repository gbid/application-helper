CREATE TABLE template_cover_letter (
		template_cover_letter_id uuid primary key default uuid_generate_v1mc(),
    user_id uuid not null references user_table (user_id) on delete cascade,
		text_content TEXT not null,
		text_content_hash TEXT not null,
		UNIQUE (user_id, text_content_hash),
		-- We allow cover letters to be uploaded as text or as a file.
		-- For file uploads, we enforce conversion to text before saving.
		template_cover_letter_title TEXT not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz
);
SELECT trigger_updated_at('"template_cover_letter"');
