-- First add the columns as nullable
ALTER TABLE headshot_generation_image_uploaded
ADD COLUMN user_id UUID REFERENCES user_table(user_id) ON DELETE CASCADE;

ALTER TABLE headshot_generation_headshot_generated
ADD COLUMN user_id UUID REFERENCES user_table(user_id) ON DELETE CASCADE;

-- Populate from parent table
UPDATE headshot_generation_image_uploaded hgiu
SET user_id = hg.user_id
FROM headshot_generation hg
WHERE hgiu.headshot_generation_id = hg.headshot_generation_id;

UPDATE headshot_generation_headshot_generated hghg
SET user_id = hg.user_id
FROM headshot_generation hg
WHERE hghg.headshot_generation_id = hg.headshot_generation_id;

-- Now make the columns non-null
ALTER TABLE headshot_generation_image_uploaded
ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE headshot_generation_headshot_generated
ALTER COLUMN user_id SET NOT NULL;
