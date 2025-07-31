CREATE TABLE headshot_generation (
    headshot_generation_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES user_table(user_id) ON DELETE CASCADE,
    trigger_word TEXT NOT NULL,
    replicate_version_id TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE headshot_generation_image_uploaded (
    headshot_generation_image_uploaded_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    headshot_generation_id UUID NOT NULL REFERENCES headshot_generation(headshot_generation_id) ON DELETE CASCADE,
    byte_content BYTEA NOT NULL,
    filename TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TABLE headshot_generation_headshot_generated (
    headshot_generation_headshot_generated_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    headshot_generation_id UUID NOT NULL REFERENCES headshot_generation(headshot_generation_id) ON DELETE CASCADE,
    byte_content BYTEA NOT NULL,
    replicate_prediction_id TEXT NOT NULL,
    seed INTEGER NOT NULL,
    prompt TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

SELECT trigger_updated_at('"headshot_generation"');
SELECT trigger_updated_at('"headshot_generation_image_uploaded"');
SELECT trigger_updated_at('"headshot_generation_headshot_generated"');
