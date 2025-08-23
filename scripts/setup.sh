#!/bin/bash

# CRM v2 Setup Script
# This script helps set up the development environment

set -e  # Exit on any error

echo "🚀 CRM v2 Setup Starting..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if required tools are installed
check_requirements() {
    print_info "Checking requirements..."
    
    # Check for Bun
    if ! command -v bun &> /dev/null; then
        print_error "Bun is not installed. Please install it first:"
        echo "curl -fsSL https://bun.sh/install | bash"
        exit 1
    fi
    print_status "Bun is installed"
    
    # Check for Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed. Please install Docker first."
        exit 1
    fi
    print_status "Docker is installed"
    
    # Check for Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed. Please install it first."
        exit 1
    fi
    print_status "Docker Compose is installed"
    
    # Check for Yarn (for frontend)
    if ! command -v yarn &> /dev/null; then
        print_warning "Yarn is not installed. Installing with npm..."
        npm install -g yarn
    fi
    print_status "Yarn is available"
}

# Setup backend
setup_backend() {
    print_info "Setting up backend..."
    
    cd backend
    
    # Copy environment file
    if [ ! -f .env ]; then
        cp .env.example .env
        print_status "Created backend .env file"
    else
        print_warning "Backend .env already exists"
    fi
    
    # Install dependencies
    print_info "Installing backend dependencies..."
    bun install
    print_status "Backend dependencies installed"
    
    cd ..
}

# Setup frontend
setup_frontend() {
    print_info "Setting up frontend..."
    
    cd frontend
    
    # Install dependencies if node_modules doesn't exist
    if [ ! -d "node_modules" ]; then
        print_info "Installing frontend dependencies..."
        yarn install
        print_status "Frontend dependencies installed"
    else
        print_status "Frontend dependencies already installed"
    fi
    
    cd ..
}

# Setup Docker environment
setup_docker() {
    print_info "Setting up Docker environment..."
    
    cd docker
    
    # Copy environment file
    if [ ! -f .env ]; then
        cp .env.example .env
        print_status "Created docker .env file"
    else
        print_warning "Docker .env already exists"
    fi
    
    cd ..
}

# Setup database
setup_database() {
    print_info "Setting up database..."
    
    # Start Supabase containers
    cd docker
    print_info "Starting database containers..."
    docker-compose up -d supabase-db
    
    # Wait for database to be ready
    print_info "Waiting for database to be ready..."
    sleep 10
    
    # Run migrations
    print_info "Running database migrations..."
    docker-compose exec -T supabase-db psql -U postgres -d postgres -f /docker-entrypoint-initdb.d/001_initial_schema.sql
    
    print_status "Database setup complete"
    cd ..
}

# Generate SSL certificates for development
generate_ssl() {
    print_info "Generating SSL certificates for development..."
    
    mkdir -p docker/nginx/ssl
    
    if [ ! -f docker/nginx/ssl/cert.pem ]; then
        openssl req -x509 -newkey rsa:4096 -keyout docker/nginx/ssl/private.key -out docker/nginx/ssl/cert.pem -days 365 -nodes -subj "/C=TR/ST=Istanbul/L=Istanbul/O=CRM v2/CN=localhost"
        print_status "SSL certificates generated"
    else
        print_warning "SSL certificates already exist"
    fi
}

# Main setup function
main() {
    print_info "Starting CRM v2 Development Environment Setup"
    echo ""
    
    # Check requirements
    check_requirements
    echo ""
    
    # Setup components
    setup_backend
    echo ""
    
    setup_frontend
    echo ""
    
    setup_docker
    echo ""
    
    # Ask if user wants to setup database
    echo ""
    read -p "Do you want to setup the database now? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        setup_database
        echo ""
    fi
    
    # Ask if user wants to generate SSL certificates
    read -p "Do you want to generate SSL certificates for HTTPS? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        generate_ssl
        echo ""
    fi
    
    print_status "Setup completed successfully!"
    echo ""
    print_info "Next steps:"
    echo "1. Update the .env files with your actual values"
    echo "2. Start the development environment: ./scripts/start.sh"
    echo "3. Access the application at: http://localhost:3000"
    echo "4. Access the API at: http://localhost:3001"
    echo ""
    print_info "For more information, check the CLAUDE.md file"
}

# Run main function
main "$@"