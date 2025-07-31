CREATE TYPE session_type AS ENUM ('Standard', 'Anonymous');

create table session (
    user_id uuid not null references user_table (user_id) on delete cascade,
    -- The lower case hex encoding of the sha2 hash of the token. The token
    -- itself should be a lower case hex encoding of a 256 bit value, i.e. 64
    -- characters.
    token_hash TEXT NOT NULL UNIQUE,
    created_at timestamptz not null default now(),
    updated_at timestamptz,
		session_type session_type not null default 'Standard'
);
SELECT trigger_updated_at('"session"');
