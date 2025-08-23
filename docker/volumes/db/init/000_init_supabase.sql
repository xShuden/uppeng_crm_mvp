-- Initialize Supabase environment
-- This script sets up the necessary roles and extensions

-- Create necessary roles
DO $$
BEGIN
    -- Create supabase_admin role if it doesn't exist
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'supabase_admin') THEN
        CREATE ROLE supabase_admin WITH
            LOGIN
            SUPERUSER
            CREATEDB
            CREATEROLE
            INHERIT
            NOREPLICATION
            CONNECTION LIMIT -1
            PASSWORD 'postgres';
    END IF;
    
    -- Create authenticator role if it doesn't exist
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'authenticator') THEN
        CREATE ROLE authenticator WITH
            LOGIN
            NOSUPERUSER
            NOCREATEDB
            NOCREATEROLE
            INHERIT
            NOREPLICATION
            CONNECTION LIMIT -1
            PASSWORD 'postgres';
    END IF;
    
    -- Create anon role if it doesn't exist
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'anon') THEN
        CREATE ROLE anon WITH
            NOSUPERUSER
            NOCREATEDB
            NOCREATEROLE
            INHERIT
            NOREPLICATION
            CONNECTION LIMIT -1;
    END IF;
    
    -- Create authenticated role if it doesn't exist
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'authenticated') THEN
        CREATE ROLE authenticated WITH
            NOSUPERUSER
            NOCREATEDB
            NOCREATEROLE
            INHERIT
            NOREPLICATION
            CONNECTION LIMIT -1;
    END IF;
    
    -- Create service_role if it doesn't exist
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'service_role') THEN
        CREATE ROLE service_role WITH
            LOGIN
            SUPERUSER
            CREATEDB
            CREATEROLE
            INHERIT
            NOREPLICATION
            CONNECTION LIMIT -1
            PASSWORD 'postgres';
    END IF;
    
    -- Create storage roles if they don't exist
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'supabase_storage_admin') THEN
        CREATE ROLE supabase_storage_admin WITH
            LOGIN
            NOSUPERUSER
            CREATEDB
            CREATEROLE
            INHERIT
            NOREPLICATION
            CONNECTION LIMIT -1
            PASSWORD 'postgres';
    END IF;
    
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'supabase_realtime_admin') THEN
        CREATE ROLE supabase_realtime_admin WITH
            LOGIN
            NOSUPERUSER
            CREATEDB
            CREATEROLE
            INHERIT
            NOREPLICATION
            CONNECTION LIMIT -1
            PASSWORD 'postgres';
    END IF;
    
    -- Create supabase_auth_admin role for GoTrue
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'supabase_auth_admin') THEN
        CREATE ROLE supabase_auth_admin WITH
            LOGIN
            NOSUPERUSER
            CREATEDB
            CREATEROLE
            INHERIT
            NOREPLICATION
            CONNECTION LIMIT -1
            PASSWORD 'postgres';
    END IF;
END
$$;

-- Grant role memberships
GRANT anon TO authenticator;
GRANT authenticated TO authenticator;
GRANT service_role TO authenticator;

-- Grant schema permissions to service roles
GRANT ALL ON SCHEMA public TO supabase_admin;
GRANT ALL ON SCHEMA public TO service_role;
GRANT USAGE ON SCHEMA public TO supabase_storage_admin;
GRANT CREATE ON SCHEMA public TO supabase_storage_admin;
GRANT ALL ON SCHEMA public TO supabase_realtime_admin;

-- Grant table permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO supabase_admin;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO supabase_storage_admin;
GRANT ALL ON ALL TABLES IN SCHEMA public TO supabase_realtime_admin;

-- Grant sequence permissions
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO supabase_admin;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO supabase_storage_admin;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO supabase_realtime_admin;

-- Grant default privileges for future objects
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO supabase_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO supabase_storage_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO supabase_realtime_admin;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO supabase_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO supabase_storage_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO supabase_realtime_admin;

-- Create necessary schemas for Supabase services
CREATE SCHEMA IF NOT EXISTS storage;
CREATE SCHEMA IF NOT EXISTS realtime;
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS _realtime;

-- Grant schema ownership and permissions
GRANT ALL ON SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON SCHEMA realtime TO supabase_realtime_admin;
GRANT ALL ON SCHEMA auth TO supabase_admin;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON SCHEMA _realtime TO supabase_realtime_admin;

-- Grant additional permissions
GRANT ALL ON ALL TABLES IN SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON ALL TABLES IN SCHEMA realtime TO supabase_realtime_admin;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO supabase_admin;

GRANT ALL ON ALL SEQUENCES IN SCHEMA storage TO supabase_storage_admin;
GRANT ALL ON ALL SEQUENCES IN SCHEMA realtime TO supabase_realtime_admin;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO supabase_admin;

-- Default privileges for new objects in these schemas
ALTER DEFAULT PRIVILEGES IN SCHEMA storage GRANT ALL ON TABLES TO supabase_storage_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA realtime GRANT ALL ON TABLES TO supabase_realtime_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT ALL ON TABLES TO supabase_admin;

ALTER DEFAULT PRIVILEGES IN SCHEMA storage GRANT ALL ON SEQUENCES TO supabase_storage_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA realtime GRANT ALL ON SEQUENCES TO supabase_realtime_admin;
ALTER DEFAULT PRIVILEGES IN SCHEMA auth GRANT ALL ON SEQUENCES TO supabase_admin;

-- Install necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pgjwt";

-- Enable Row Level Security
ALTER DATABASE postgres SET row_security = on;