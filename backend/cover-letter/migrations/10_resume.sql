CREATE TABLE resume (
		resume_id uuid primary key DEFAULT uuid_generate_v1mc(),
    user_id uuid NOT NULL references user_table (user_id) on delete cascade,
		-- resume will always be uploaded as a pdf
    byte_content bytea NOT NULL,
		-- text_content will be extracted from the pdf before saving
		text_content text NOT NULL,
		-- hash of the pdf file to check if the file has been uploaded before:
		byte_content_hash TEXT NOT NULL,
		UNIQUE (user_id, byte_content_hash),
		size integer NOT NULL,
    file_path TEXT NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz
);
SELECT trigger_updated_at('"resume"');
