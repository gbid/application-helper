-- Step 1: Create the new enum type
CREATE TYPE job_description_language AS ENUM ('English', 'German');

-- Step 2: Add the new column with a default value (temporary default)
ALTER TABLE job ADD COLUMN job_description_language job_description_language;

-- Step 3: Update existing rows to have a valid value
UPDATE job SET job_description_language = 'German';

-- Step 4: Alter the column to set it as NOT NULL
ALTER TABLE job ALTER COLUMN job_description_language SET NOT NULL;
