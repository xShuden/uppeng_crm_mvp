-- Storage schema initialization
-- Based on https://github.com/supabase/storage-api/blob/main/migrations

BEGIN;

-- Create storage schema tables
CREATE TABLE IF NOT EXISTS storage.buckets (
  id text PRIMARY KEY,
  name text NOT NULL,
  owner uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  public boolean DEFAULT false,
  avif_autodetection boolean DEFAULT false,
  file_size_limit bigint,
  allowed_mime_types text[],
  owner_id text
);

CREATE UNIQUE INDEX IF NOT EXISTS bname ON storage.buckets USING btree (name);

CREATE TABLE IF NOT EXISTS storage.objects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  bucket_id text REFERENCES storage.buckets(id),
  name text,
  owner uuid,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  last_accessed_at timestamptz DEFAULT now(),
  metadata jsonb,
  path_tokens text[],
  version text,
  owner_id text
);

CREATE UNIQUE INDEX IF NOT EXISTS bucketid_objname ON storage.objects USING btree (bucket_id, name);
CREATE INDEX IF NOT EXISTS name_prefix_search ON storage.objects USING btree (name text_pattern_ops);

-- Migrations table for storage
CREATE TABLE IF NOT EXISTS migrations (
  id integer PRIMARY KEY,
  name varchar(100) UNIQUE NOT NULL,
  hash varchar(40) NOT NULL,
  executed_at timestamp DEFAULT current_timestamp
);

COMMIT;