-- Realtime schema initialization  
-- Based on https://github.com/supabase/realtime

BEGIN;

-- Extensions needed for realtime
CREATE EXTENSION IF NOT EXISTS "plpgsql";

-- Create realtime schema tables
CREATE TABLE IF NOT EXISTS realtime.schema_migrations (
  version bigint PRIMARY KEY,
  inserted_at timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS realtime.subscription (
  id bigserial PRIMARY KEY,
  subscription_id uuid NOT NULL,
  entity regclass NOT NULL,
  filters realtime.user_defined_filter[] DEFAULT '{}' NOT NULL,
  claims jsonb NOT NULL,
  claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
  created_at timestamp DEFAULT timezone('utc', now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS subscription_subscription_id_entity_filters_index ON realtime.subscription USING btree (subscription_id, entity, filters);
CREATE INDEX IF NOT EXISTS subscription_entity_index ON realtime.subscription USING btree (entity);
CREATE INDEX IF NOT EXISTS subscription_claims_role_index ON realtime.subscription USING btree (claims_role);

COMMIT;