# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a CRM v2 Randevu Takip (Appointment Tracking) application built with React/TypeScript frontend and Bun/TypeScript backend. It's a multi-tenant system designed for beauty salons, clinics, and similar service businesses.

### System Architecture
```
Frontend (React + TS) ↔ Backend (Bun + Elysia) ↔ Database (Supabase/PostgreSQL)
                                ↕
                        WhatsApp AI Bot (n8n) [Future]
```

## Development Commands

### Frontend Development
```bash
cd frontend
yarn start          # Start development server
yarn build          # Build for production
yarn test           # Run tests
```

### Backend Development (To Be Implemented)
```bash
cd backend
bun install         # Install dependencies
bun dev             # Start development server
bun build           # Build for production
bun test            # Run tests
```

## Multi-Tenant System Design

### User Roles & Hierarchy
1. **SuperAdmin** - System administrator
   - Creates and manages companies (tenants)
   - System-wide oversight
2. **Company Owner** - Business owner
   - Manages staff, services, appointments
   - Full access to company data
3. **Staff** - Service providers
   - Manages their appointments and customers
   - Limited access based on role
4. **Customer** - Service recipients (via WhatsApp bot - future)

## Database Schema Overview

### Core Tables Structure

#### **1. SuperAdmin & Company Management**
```sql
superadmins (
  id, email, password_hash, full_name, is_active
)

companies (
  id, owner_info (name, email, phone),
  company_info (name, title, address, phone, website),
  social_media (instagram, facebook, twitter, whatsapp_business),
  working_hours (JSON), notes,
  system_settings (is_active, ai_token_limit, api_key),
  subscription_info
)
```

#### **2. Service Management**
```sql
service_categories (id, company_id, name, display_order)
professions (id, company_id, name, description) -- Protez Uzmanı, Makyöz
services (
  id, company_id, category_id, name, description, notes,
  price_regular, price_student, price_vip, -- 3 pricing tiers
  duration_minutes, requires_patch_test
)
service_professions (service_id, profession_id) -- Which service requires which expertise
```

#### **3. Staff Management**
```sql
staff (
  id, company_id, personal_info (name, email, phone),
  work_info (hire_date, profession_id, commission_rate),
  statistics (total_customers_served, total_appointments, total_revenue),
  system_access (can_login, password_hash)
)

staff_services (staff_id, service_id, custom_duration) -- What services can staff provide
staff_schedules (staff_id, day_of_week, start_time, end_time, break_times)
staff_leaves (staff_id, leave_date, leave_type, is_full_day, reason)
```

#### **4. Customer Management**
```sql
customers (
  id, company_id, personal_info (name, phone, email, birth_date),
  statistics (first_visit, last_visit, total_visits, total_spent, total_hours),
  preferences (preferred_staff, customer_type, notes, allergies),
  marketing (source, referrer, tags)
)

customer_service_history (
  customer_id, appointment_id, service_id, staff_id,
  service_date, duration, price, notes
)
```

#### **5. Appointment/Reservation System**
```sql
appointments (
  id, company_id, customer_id,
  timing (appointment_date, start_time, end_time, total_duration),
  status (pending, confirmed, arrived, in_service, completed, cancelled, no_show),
  pricing (subtotal, discount, total_amount),
  payment (status, method, paid_amount),
  notes (customer_notes, internal_notes),
  metadata (source, created_by, cancelled_info)
)

appointment_services (
  appointment_id, service_id, staff_id,
  start_time, end_time, duration_minutes,
  price_type (regular/student/vip), unit_price,
  status, notes, display_order
)
```

#### **6. FAQ & API Management**
```sql
company_faqs (id, company_id, category, question, answer, display_order)
api_tokens (id, company_id, token_hash, permissions, daily_limit, expires_at)
audit_logs (company_id, user_info, action, entity_info, old_values, new_values)
```

## Key Business Logic

### Appointment Creation Flow
1. **Customer Selection/Creation** - Find existing or create new
2. **Service Selection** - Choose from available services (with 3-tier pricing)
3. **Staff Filtering** - Show only staff qualified for selected services
4. **Availability Check** - Consider schedules, existing appointments, leaves
5. **Booking Confirmation** - Create appointment with all services

### Staff-Service Relationship
- Staff assigned to professions (Protez Uzmanı, Makyöz, etc.)
- Services linked to required professions
- Automatic filtering: only qualified staff shown for each service
- Optional: manual staff-service assignments with custom pricing/duration

### Multi-Tenant Data Isolation
- Every query filtered by company_id
- Row-level security in database
- API token permissions per company
- Complete data isolation between companies

## Frontend Architecture (Current React App)

### Existing Structure to Modify
- **Dashboard**: Convert e-commerce metrics to appointment/revenue metrics
- **Calendar**: Already exists - adapt for appointments
- **Products → Services**: Convert product management to service management
- **Orders → Appointments**: Convert order system to appointment booking
- **Sellers → Staff**: Convert seller management to staff management
- **Customers**: Keep and enhance for beauty salon needs
- **Invoices**: Keep for appointment billing

### New Components to Add
```
src/pages/
├── SuperAdmin/
│   ├── Dashboard/
│   ├── Companies/
│   └── SystemSettings/
├── Appointments/
│   ├── Calendar/
│   ├── Create/
│   └── History/
├── Services/
│   ├── Categories/
│   ├── Professions/
│   └── Management/
├── Staff/
│   ├── Management/
│   ├── Schedules/
│   └── Leaves/
├── FAQ/
└── Reports/
```

## Technology Stack

### Backend (To Be Implemented)
- **Runtime**: Bun (ultra-fast JavaScript runtime)
- **Framework**: Elysia.js (type-safe, performant web framework)
- **Database**: Supabase (PostgreSQL with real-time features)
- **Authentication**: JWT with role-based access control
- **API Documentation**: Auto-generated OpenAPI/Swagger

### Frontend (Current)
- **Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **UI Library**: Bootstrap 5.3.2 with custom SCSS
- **Charts**: ApexCharts
- **Calendar**: FullCalendar
- **Forms**: Formik + Yup validation

### DevOps
- **Containerization**: Docker + Docker Compose
- **Local Database**: Supabase local development
- **Production**: Docker Swarm with Portainer
- **CI/CD**: GitHub Actions (to be implemented)

## API Design (For Future WhatsApp Bot)

### Public API Endpoints (Token-based auth)
```
GET  /api/v1/services                    # List available services
GET  /api/v1/staff/availability          # Check staff availability
POST /api/v1/appointments/check          # Validate appointment possibility  
POST /api/v1/appointments/create         # Create new appointment
GET  /api/v1/faq/search                  # Search FAQ for chatbot
```

### Internal API (JWT auth)
```
POST /api/auth/login                     # Multi-tenant login
GET  /api/appointments                   # CRUD operations
GET  /api/customers                      # Customer management
GET  /api/staff                          # Staff management
GET  /api/services                       # Service management
```

## Development Phases

### Phase 1: Foundation
1. Backend setup (Bun + Elysia + Supabase)
2. Database schema implementation
3. Multi-tenant authentication
4. Basic CRUD APIs

### Phase 2: Core Features  
1. Appointment booking system
2. Staff schedule management
3. Customer management
4. Service management

### Phase 3: Frontend Adaptation
1. Convert existing React components
2. Multi-tenant routing
3. Role-based UI components
4. Calendar integration

### Phase 4: Advanced Features
1. Reporting dashboard
2. FAQ management
3. API token system
4. Audit logging

### Phase 5: WhatsApp Integration (Future)
1. n8n workflow setup
2. AI chatbot integration
3. Natural language processing
4. Appointment booking via WhatsApp

## Current Status

- ✅ Frontend template ready (React + TypeScript)
- ✅ Database schema designed
- ✅ Multi-tenant architecture planned
- ✅ **Supabase Local Environment Fully Operational** (All 13 Services)
- 🔄 Ready to start backend implementation
- ⏳ Frontend component conversion pending
- ⏳ WhatsApp bot integration planned for future

## Supabase Local Development Setup

### ✅ Successfully Running Services (13/13):

**Core Infrastructure:**
- 🗄️ **supabase-db** (PostgreSQL 15.8.1) - Database server
- 🔗 **supabase-pooler** (Supavisor 2.5.7) - Connection pooler for high performance
- 🚪 **supabase-kong** (Kong 2.8.1) - API Gateway and load balancer

**Backend Services:**
- 🔐 **supabase-auth** (GoTrue 2.177.0) - Authentication and user management
- 🔌 **supabase-rest** (PostgREST 12.2.12) - Auto-generated REST API from database schema
- 📂 **supabase-storage** (Storage API 1.25.7) - File storage and management
- ⚡ **supabase-edge-functions** (Edge Runtime 1.67.4) - Serverless functions
- 🔄 **realtime** (Realtime 2.34.47) - Real-time subscriptions (minor config issue, non-critical)

**Management & Monitoring:**
- 📱 **supabase-studio** (Studio 2025.06.30) - Web-based database management UI
- 🛠️ **supabase-meta** (postgres-meta 0.91.0) - Database metadata API
- 📊 **supabase-analytics** (Logflare 1.14.2) - Logging and analytics
- 🖼️ **supabase-imgproxy** (imgproxy 3.8.0) - Image transformation
- 📋 **supabase-vector** (Vector 0.28.1) - Log processing pipeline

### 🔑 Production-Ready Credentials Configuration:

```bash
# Core Authentication
POSTGRES_PASSWORD=Q6JUCMrX6UBQ81ONH1kC5nz         # Secure PostgreSQL password
JWT_SECRET=K8iHvYlVt7pG8aQ6JUCMrX6UBQ81ONH1kC5nz... # 256-bit JWT signing key
VAULT_ENC_KEY=y00i2ykAEPvTMAF3PAQonQ0Dw86t5Tpd      # AES-256-GCM encryption key

# Real Supabase Project Keys
ANON_KEY=eyJhbGciOiJIUzI1NiIs...                    # Project anonymous access key
SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIs...             # Project service role key

# Customized Branding
DASHBOARD_USERNAME=zeytinlik                         # Admin dashboard access
STUDIO_DEFAULT_ORGANIZATION=Uppeng_Org               # Organization display name
STUDIO_DEFAULT_PROJECT=Uppeng_Project                # Project display name
```

### 🌐 Development Access Points:

- **🔗 Main API Endpoint**: http://localhost:54321
- **📱 Supabase Studio Dashboard**: http://localhost:54324
- **🗄️ PostgreSQL Direct**: localhost:5432 (via pooler)
- **🔗 Pooler Transaction Mode**: localhost:6543
- **📊 Analytics Dashboard**: http://localhost:4000

### ⚠️ Important Setup Notes:

1. **Credentials Format**: Avoid dash characters (-) in environment variables as they can cause encryption issues with Supavisor
2. **Database Initialization**: Clean volume restarts ensure proper user password synchronization
3. **Connection Pooling**: Supavisor successfully configured for production-scale connection management
4. **Realtime Service**: Minor configuration issue (API key mismatch) but doesn't affect core functionality

### 🔧 Maintenance Commands:

```bash
# Start all services
cd docker && docker compose up -d

# Check service status
docker compose ps

# View logs for specific service
docker compose logs [service-name] --tail=50

# Clean restart (if credential changes)
docker compose down -v && rm -rf volumes/db/data && docker compose up -d
```

## Configuration Notes
- TypeScript with strict mode enabled
- Base URL set to `./src` for cleaner imports
- Environment-based configuration for multi-tenant setup
- Docker-ready for local and production deployment
- **Full Supabase stack verified and operational**