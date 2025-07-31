CREATE TYPE interview_question_status AS ENUM (
	'Prefetched',
	'Used'
);
-- add a field of this type to the interview_question table:
ALTER TABLE interview_question
ADD COLUMN status interview_question_status;
