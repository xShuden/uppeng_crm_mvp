-- Initial Schema for CRM v2 Appointment Tracking System
-- Multi-tenant architecture with complete data isolation

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable RLS (Row Level Security)
ALTER DATABASE postgres SET row_security = on;

-- ============================================================================
-- 1. SUPERADMIN & COMPANY MANAGEMENT
-- ============================================================================

-- SuperAdmins table
CREATE TABLE superadmins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name VARCHAR(200),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies (Tenants) table
CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    
    -- Owner Information
    owner_first_name VARCHAR(100) NOT NULL,
    owner_last_name VARCHAR(100) NOT NULL,
    owner_email VARCHAR(255) UNIQUE NOT NULL,
    owner_phone VARCHAR(20),
    password_hash TEXT NOT NULL,
    
    -- Company Information
    company_name VARCHAR(255) NOT NULL,
    company_title VARCHAR(255),
    address TEXT,
    phone VARCHAR(20),
    website VARCHAR(255),
    google_maps_link TEXT,
    
    -- Social Media
    instagram_url VARCHAR(255),
    facebook_url VARCHAR(255),
    twitter_url VARCHAR(255),
    whatsapp_business VARCHAR(20),
    
    -- Working Hours (JSON format)
    working_hours JSONB DEFAULT '{"monday":{"open":"09:00","close":"18:00"},"tuesday":{"open":"09:00","close":"18:00"},"wednesday":{"open":"09:00","close":"18:00"},"thursday":{"open":"09:00","close":"18:00"},"friday":{"open":"09:00","close":"18:00"},"saturday":{"open":"09:00","close":"16:00"},"sunday":{"closed":true}}',
    
    -- System Settings
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    ai_token_limit INTEGER DEFAULT 1000,
    api_key VARCHAR(255) UNIQUE,
    api_secret_hash TEXT,
    
    -- Subscription
    subscription_plan VARCHAR(50) DEFAULT 'basic',
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    created_by UUID REFERENCES superadmins(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Generate API key trigger
CREATE OR REPLACE FUNCTION generate_api_key()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.api_key IS NULL THEN
        NEW.api_key := 'crm_' || lower(regexp_replace(NEW.company_name, '[^a-zA-Z0-9]', '', 'g')) || '_' || substring(gen_random_uuid()::text from 1 for 8);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_generate_api_key
    BEFORE INSERT ON companies
    FOR EACH ROW
    EXECUTE FUNCTION generate_api_key();

-- ============================================================================
-- 2. SERVICE MANAGEMENT
-- ============================================================================

-- Service Categories
CREATE TABLE service_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Professions (Expertise areas)
CREATE TABLE professions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3B82F6',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services
CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    category_id UUID REFERENCES service_categories(id),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    notes TEXT,
    
    -- 3-tier pricing
    price_regular DECIMAL(10,2),
    price_student DECIMAL(10,2),
    price_vip DECIMAL(10,2),
    
    duration_minutes INTEGER NOT NULL,
    color VARCHAR(7) DEFAULT '#10B981',
    
    -- Special requirements
    requires_patch_test BOOLEAN DEFAULT false,
    patch_test_hours INTEGER DEFAULT 24,
    max_per_day INTEGER,
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Service-Profession relationship (which service requires which expertise)
CREATE TABLE service_professions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    profession_id UUID REFERENCES professions(id) ON DELETE CASCADE,
    UNIQUE(service_id, profession_id)
);

-- ============================================================================
-- 3. STAFF MANAGEMENT
-- ============================================================================

-- Staff
CREATE TABLE staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    
    -- Personal Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20) NOT NULL,
    
    -- Work Information
    hire_date DATE NOT NULL,
    profession_id UUID REFERENCES professions(id),
    commission_rate DECIMAL(5,2) DEFAULT 0.00,
    
    -- Statistics (auto-updated)
    total_customers_served INTEGER DEFAULT 0,
    total_appointments INTEGER DEFAULT 0,
    total_revenue DECIMAL(12,2) DEFAULT 0,
    
    -- System Access
    password_hash TEXT,
    can_login BOOLEAN DEFAULT false,
    
    -- Display
    avatar_url TEXT,
    calendar_color VARCHAR(7) DEFAULT '#8B5CF6',
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff Services (what services can each staff provide)
CREATE TABLE staff_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    staff_id UUID REFERENCES staff(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    custom_duration INTEGER,
    is_active BOOLEAN DEFAULT true,
    UNIQUE(staff_id, service_id)
);

-- Staff Schedules (weekly working hours)
CREATE TABLE staff_schedules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    staff_id UUID REFERENCES staff(id) ON DELETE CASCADE,
    day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0=Sunday, 6=Saturday
    start_time TIME,
    end_time TIME,
    break_start TIME,
    break_end TIME,
    is_working BOOLEAN DEFAULT true,
    UNIQUE(staff_id, day_of_week)
);

-- Staff Leaves
CREATE TABLE staff_leaves (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    staff_id UUID REFERENCES staff(id) ON DELETE CASCADE,
    leave_date DATE NOT NULL,
    leave_type VARCHAR(50) DEFAULT 'personal', -- sick, vacation, personal, emergency
    is_full_day BOOLEAN DEFAULT true,
    start_time TIME,
    end_time TIME,
    reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 4. CUSTOMER MANAGEMENT
-- ============================================================================

-- Customers
CREATE TABLE customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    
    -- Personal Information
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255),
    birth_date DATE,
    gender VARCHAR(10) CHECK (gender IN ('male', 'female', 'other')),
    
    -- Statistics (auto-updated)
    first_visit_date DATE,
    last_visit_date DATE,
    total_visits INTEGER DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0,
    total_service_hours DECIMAL(10,2) DEFAULT 0,
    
    -- Preferences
    preferred_staff_id UUID REFERENCES staff(id),
    customer_type VARCHAR(50) DEFAULT 'regular', -- regular, vip, student
    
    -- Notes and Medical Info
    notes TEXT,
    allergies TEXT,
    medical_conditions TEXT,
    
    -- Marketing
    source VARCHAR(50), -- instagram, google, referral, walk-in
    referrer_customer_id UUID REFERENCES customers(id),
    tags TEXT[], -- Array of tags like ['VIP', 'Regular', 'Sensitive']
    
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(company_id, phone) -- Phone unique per company
);

-- Customer Service History
CREATE TABLE customer_service_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
    appointment_id UUID, -- Will reference appointments table
    service_id UUID REFERENCES services(id),
    staff_id UUID REFERENCES staff(id),
    service_date DATE,
    duration_minutes INTEGER,
    price DECIMAL(10,2),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 5. APPOINTMENT/RESERVATION MANAGEMENT
-- ============================================================================

-- Appointments
CREATE TABLE appointments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES customers(id),
    
    -- Timing
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    total_duration INTEGER, -- Total duration in minutes
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'arrived', 'in_service', 'completed', 'cancelled', 'no_show')),
    
    -- Pricing
    subtotal DECIMAL(10,2),
    discount_amount DECIMAL(10,2) DEFAULT 0,
    discount_type VARCHAR(20) DEFAULT 'fixed', -- percentage, fixed
    total_amount DECIMAL(10,2),
    
    -- Payment
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'partial', 'paid')),
    payment_method VARCHAR(50), -- cash, card, transfer
    paid_amount DECIMAL(10,2) DEFAULT 0,
    
    -- Notes
    customer_notes TEXT,
    internal_notes TEXT,
    
    -- Source tracking
    source VARCHAR(50) DEFAULT 'web', -- web, whatsapp, phone, walk-in
    
    -- Cancellation info
    cancelled_at TIMESTAMP WITH TIME ZONE,
    cancelled_by VARCHAR(50), -- customer, staff, system
    cancellation_reason TEXT,
    
    -- Metadata
    created_by UUID, -- Can reference staff or system
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Appointment Services (services included in each appointment)
CREATE TABLE appointment_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    appointment_id UUID REFERENCES appointments(id) ON DELETE CASCADE,
    service_id UUID REFERENCES services(id),
    staff_id UUID REFERENCES staff(id),
    
    -- Timing for this specific service
    start_time TIME,
    end_time TIME,
    duration_minutes INTEGER,
    
    -- Pricing
    price_type VARCHAR(20) DEFAULT 'regular' CHECK (price_type IN ('regular', 'student', 'vip')),
    unit_price DECIMAL(10,2),
    
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
    notes TEXT,
    display_order INTEGER DEFAULT 0
);

-- ============================================================================
-- 6. FAQ & SUPPORT
-- ============================================================================

-- Company FAQs
CREATE TABLE company_faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    category VARCHAR(100),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- 7. API & AUDIT
-- ============================================================================

-- API Tokens
CREATE TABLE api_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    token_name VARCHAR(100),
    token_hash TEXT NOT NULL,
    permissions TEXT[] DEFAULT ARRAY['read:appointments'], -- Array of permissions
    daily_limit INTEGER DEFAULT 1000,
    expires_at TIMESTAMP WITH TIME ZONE,
    last_used_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
    user_type VARCHAR(50), -- superadmin, owner, staff
    user_id UUID,
    action VARCHAR(100), -- appointment.create, customer.update, etc.
    entity_type VARCHAR(50),
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Appointments indexes
CREATE INDEX idx_appointments_date ON appointments(appointment_date);
CREATE INDEX idx_appointments_customer ON appointments(customer_id);
CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_company ON appointments(company_id);
CREATE INDEX idx_appointments_datetime ON appointments(appointment_date, start_time);

-- Customer indexes
CREATE INDEX idx_customers_phone ON customers(phone);
CREATE INDEX idx_customers_company ON customers(company_id);
CREATE INDEX idx_customers_name ON customers(first_name, last_name);

-- Staff indexes
CREATE INDEX idx_staff_company ON staff(company_id);
CREATE INDEX idx_staff_active ON staff(is_active);

-- Services indexes
CREATE INDEX idx_services_company ON services(company_id);
CREATE INDEX idx_services_active ON services(is_active);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tenant-scoped tables
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE professions ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE api_tokens ENABLE ROW LEVEL SECURITY;

-- Create policies (basic tenant isolation)
-- More specific policies will be added in the application layer

-- ============================================================================
-- TRIGGERS FOR AUTO-UPDATING STATISTICS
-- ============================================================================

-- Function to update customer statistics
CREATE OR REPLACE FUNCTION update_customer_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.status = 'completed' THEN
        UPDATE customers 
        SET 
            total_visits = total_visits + 1,
            total_spent = total_spent + NEW.total_amount,
            last_visit_date = NEW.appointment_date
        WHERE id = NEW.customer_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_customer_stats
    AFTER INSERT OR UPDATE OF status ON appointments
    FOR EACH ROW
    EXECUTE FUNCTION update_customer_stats();

-- Function to update staff statistics
CREATE OR REPLACE FUNCTION update_staff_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' AND NEW.status = 'completed' THEN
        UPDATE staff 
        SET 
            total_appointments = total_appointments + 1,
            total_revenue = total_revenue + NEW.unit_price
        WHERE id = NEW.staff_id;
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_staff_stats
    AFTER INSERT OR UPDATE OF status ON appointment_services
    FOR EACH ROW
    EXECUTE FUNCTION update_staff_stats();

-- ============================================================================
-- DEFAULT DATA
-- ============================================================================

-- Insert default superadmin (password: admin123 - change in production!)
INSERT INTO superadmins (email, password_hash, full_name) 
VALUES ('admin@crmv2.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Administrator');

-- Insert sample company for testing
INSERT INTO companies (
    owner_first_name, owner_last_name, owner_email, password_hash,
    company_name, company_title, phone, address,
    instagram_url, whatsapp_business,
    created_by
) VALUES (
    'Ayşe', 'Yılmaz', 'ayse@guzelliksalonu.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'Güzellik Salonu', 'En İyi Güzellik ve Bakım Merkezi', '+905551234567', 
    'Atatürk Caddesi No:123 Kadıköy/İstanbul',
    'https://instagram.com/guzelliksalonu', '+905551234567',
    (SELECT id FROM superadmins WHERE email = 'admin@crmv2.com')
);

COMMIT;