CREATE TABLE application (
    application_id UUID PRIMARY KEY NOT NULL DEFAULT uuid_generate_v1mc(),
    user_id UUID NOT NULL REFERENCES user_table (user_id) ON DELETE CASCADE,
		job_id UUID REFERENCES job(job_id) NOT NULL,
		resume_id UUID REFERENCES resume(resume_id) NOT NULL,
		UNIQUE (user_id, job_id, resume_id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ
);
SELECT trigger_updated_at('"application"');
