# CRM v2 - Supabase Local Development Environment

Complete local Supabase stack with all 13 services for CRM v2 development.

## 🚀 Quick Setup

### 1. Environment Configuration
```bash
# Copy the environment template
cp .env.example .env

# Edit .env with your actual credentials
nano .env
```

### 2. Required Environment Variables

Fill in these **critical** values in your `.env` file:

```bash
# Database
POSTGRES_PASSWORD=your-super-secret-and-long-postgres-password

# JWT Configuration  
JWT_SECRET=your-super-secret-jwt-token-with-at-least-32-characters-long

# Supabase Project Keys (from your Supabase dashboard)
ANON_KEY=your-supabase-project-anon-key
SERVICE_ROLE_KEY=your-supabase-project-service-role-key

# Encryption (32 characters, no special characters)
VAULT_ENC_KEY=your-32-character-encryption-key

# Admin Access
DASHBOARD_USERNAME=your-dashboard-username
DASHBOARD_PASSWORD=your-secure-dashboard-password

# Organization Branding
STUDIO_DEFAULT_ORGANIZATION=Your Organization Name
STUDIO_DEFAULT_PROJECT=Your Project Name
```

### 3. Generate Secure Keys

```bash
# Generate secure passwords
openssl rand -base64 32

# Generate UUID for tenant ID
uuidgen

# For VAULT_ENC_KEY (avoid special characters)
openssl rand -base64 32 | tr -d '+/=' | head -c 32
```

### 4. Start Services

```bash
# Start all 13 Supabase services
docker compose up -d

# Check service status
docker compose ps

# View logs
docker compose logs [service-name] --tail=50
```

## 🌐 Access Points

Once running, access your services at:

| Service | URL | Description |
|---------|-----|-------------|
| **API Endpoint** | http://localhost:54321 | Main Supabase API |
| **Studio Dashboard** | http://localhost:54324 | Database management UI |
| **Analytics** | http://localhost:4000 | Logging and analytics |
| **PostgreSQL** | localhost:5432 | Direct database connection |
| **Pooler** | localhost:6543 | Transaction pooling |

## 📋 Services Overview

### ✅ All 13 Services Included:

**Core Infrastructure:**
- 🗄️ **supabase-db** - PostgreSQL 15.8.1 database
- 🔗 **supabase-pooler** - Supavisor connection pooler  
- 🚪 **supabase-kong** - Kong API gateway

**Backend Services:**
- 🔐 **supabase-auth** - GoTrue authentication
- 🔌 **supabase-rest** - PostgREST auto-generated API
- 📂 **supabase-storage** - File storage management
- ⚡ **supabase-edge-functions** - Serverless functions
- 🔄 **supabase-realtime** - Real-time subscriptions

**Management & Monitoring:**
- 📱 **supabase-studio** - Web-based admin dashboard
- 🛠️ **supabase-meta** - Database metadata API  
- 📊 **supabase-analytics** - Logflare logging system
- 🖼️ **supabase-imgproxy** - Image transformation
- 📋 **supabase-vector** - Log processing pipeline

## 🔧 Maintenance Commands

```bash
# Stop all services
docker compose down

# Clean restart (if you change credentials)
docker compose down -v && rm -rf volumes/db/data && docker compose up -d

# View service logs
docker compose logs [service-name] --tail=50

# Update services
docker compose pull && docker compose up -d
```

## ⚠️ Important Notes

1. **Credentials Security**: Never commit `.env` file to version control
2. **Character Restrictions**: Avoid dash (-) characters in passwords for Supavisor compatibility  
3. **Clean Restarts**: Delete `volumes/db/data` when changing database passwords
4. **Production Ready**: This setup uses production-grade configurations

## 🆘 Troubleshooting

### Common Issues:

**Supavisor Restart Loop:**
- Usually caused by invalid characters in `VAULT_ENC_KEY` or `POSTGRES_PASSWORD`
- Regenerate keys without special characters
- Clean restart with `docker compose down -v`

**Database Connection Issues:**
- Verify `POSTGRES_PASSWORD` matches between services
- Check if database initialization completed: `docker compose logs db`

**API Authentication Errors:**
- Verify `ANON_KEY` and `SERVICE_ROLE_KEY` are from your actual Supabase project
- Test API: `curl -H "apikey: YOUR_ANON_KEY" http://localhost:54321/rest/v1/`

## 🔗 Integration with CRM v2

This Supabase stack provides the complete backend for the CRM v2 application:

- **Multi-tenant Architecture**: Row-level security for company isolation
- **Real-time Features**: Live appointment updates
- **File Storage**: Customer documents and images
- **Authentication**: Role-based access (SuperAdmin, Owner, Staff, Customer)
- **API**: Auto-generated REST endpoints from database schema

See main project documentation in `../CLAUDE.md` for full system architecture.
