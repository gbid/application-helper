CREATE TABLE job (
    job_id uuid primary key default uuid_generate_v1mc() NOT NULL,
    job_title TEXT NOT NULL,
    job_description TEXT NOT NULL,
		job_description_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ,
    UNIQUE(job_description_hash)
);
SELECT trigger_updated_at('"job"');
