CREATE TYPE subscription_status AS ENUM ('Active', 'Inactive');
ALTER TABLE user_table
ADD COLUMN stripe_customer_id TEXT,
ADD COLUMN subscription_status subscription_status;
