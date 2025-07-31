CREATE TABLE cover_letter (
    revision_id UUID PRIMARY KEY NOT NULL REFERENCES application_parameters ON DELETE CASCADE
);
