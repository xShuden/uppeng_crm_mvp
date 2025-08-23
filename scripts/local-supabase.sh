#!/bin/bash

# Local Supabase Setup Script
# This script manages the local Supabase development environment

set -e

echo "🗄️  Supabase Local Development Manager..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
DOCKER_DIR="$PROJECT_DIR/docker"

# Function to start Supabase
start_supabase() {
    print_info "Starting Supabase local stack..."
    
    cd "$DOCKER_DIR"
    
    # Start full Supabase services
    docker-compose -f docker-compose.full.yml up -d \
        supabase-db \
        supabase-auth \
        supabase-rest \
        supabase-realtime \
        supabase-storage \
        supabase-imgproxy \
        supabase-meta \
        supabase-edge-functions \
        supabase-kong \
        supabase-studio
    
    print_status "Supabase services started"
    
    # Wait for services to be ready
    print_info "Waiting for services to be ready..."
    sleep 20
    
    # Check service health
    check_health
}

# Function to stop Supabase
stop_supabase() {
    print_info "Stopping Supabase services..."
    
    cd "$DOCKER_DIR"
    
    docker-compose -f docker-compose.full.yml stop \
        supabase-db \
        supabase-auth \
        supabase-rest \
        supabase-realtime \
        supabase-storage \
        supabase-imgproxy \
        supabase-meta \
        supabase-edge-functions \
        supabase-kong \
        supabase-studio
    
    print_status "Supabase services stopped"
}

# Function to restart Supabase
restart_supabase() {
    print_info "Restarting Supabase services..."
    stop_supabase
    sleep 5
    start_supabase
}

# Function to check service health
check_health() {
    print_info "Checking service health..."
    
    # Check database
    if docker-compose exec -T supabase-db pg_isready -U postgres -d postgres > /dev/null 2>&1; then
        print_status "Database is ready"
    else
        print_error "Database is not ready"
    fi
    
    # Check Kong API Gateway
    if curl -s http://localhost:54321/rest/v1/ > /dev/null 2>&1; then
        print_status "Kong API Gateway is ready"
    else
        print_warning "Kong API Gateway is not responding (this might be normal during startup)"
    fi
    
    # Check Studio
    if curl -s http://localhost:54324 > /dev/null 2>&1; then
        print_status "Supabase Studio is ready"
    else
        print_warning "Supabase Studio is not responding"
    fi
}

# Function to show logs
show_logs() {
    local service=${1:-"all"}
    
    cd "$DOCKER_DIR"
    
    case $service in
        "db")
            docker-compose logs -f supabase-db
            ;;
        "auth")
            docker-compose logs -f supabase-auth
            ;;
        "rest")
            docker-compose logs -f supabase-rest
            ;;
        "realtime")
            docker-compose logs -f supabase-realtime
            ;;
        "storage")
            docker-compose logs -f supabase-storage
            ;;
        "kong")
            docker-compose logs -f supabase-kong
            ;;
        "studio")
            docker-compose logs -f supabase-studio
            ;;
        "all"|*)
            docker-compose logs -f \
                supabase-db \
                supabase-auth \
                supabase-rest \
                supabase-realtime \
                supabase-storage \
                supabase-kong \
                supabase-studio
            ;;
    esac
}

# Function to reset database
reset_db() {
    print_warning "This will delete all data in the local database!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "Resetting database..."
        
        cd "$DOCKER_DIR"
        
        # Stop services
        docker-compose stop supabase-db
        
        # Remove database volume
        docker-compose down -v --remove-orphans
        docker volume rm docker_supabase-db-data 2>/dev/null || true
        
        # Restart services
        start_supabase
        
        print_status "Database reset complete"
    else
        print_info "Database reset cancelled"
    fi
}

# Function to run migrations
run_migrations() {
    print_info "Running database migrations..."
    
    cd "$DOCKER_DIR"
    
    # Check if database is running
    if ! docker-compose ps supabase-db | grep -q "Up"; then
        print_error "Database is not running. Start Supabase first."
        exit 1
    fi
    
    # Run migrations
    docker-compose exec -T supabase-db psql -U postgres -d postgres -f /docker-entrypoint-initdb.d/001_initial_schema.sql
    
    print_status "Migrations completed"
}

# Function to create database backup
backup_db() {
    local backup_file="backup_$(date +%Y%m%d_%H%M%S).sql"
    
    print_info "Creating database backup: $backup_file"
    
    cd "$DOCKER_DIR"
    
    docker-compose exec -T supabase-db pg_dump -U postgres -d postgres > "$backup_file"
    
    print_status "Backup created: $backup_file"
}

# Function to restore database backup
restore_db() {
    local backup_file="$1"
    
    if [ -z "$backup_file" ]; then
        print_error "Please provide backup file path"
        exit 1
    fi
    
    if [ ! -f "$backup_file" ]; then
        print_error "Backup file not found: $backup_file"
        exit 1
    fi
    
    print_warning "This will replace all data in the local database!"
    read -p "Are you sure? (y/N): " -n 1 -r
    echo
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        print_info "Restoring database from: $backup_file"
        
        cd "$DOCKER_DIR"
        
        # Drop and recreate database
        docker-compose exec -T supabase-db psql -U postgres -c "DROP DATABASE IF EXISTS postgres;"
        docker-compose exec -T supabase-db psql -U postgres -c "CREATE DATABASE postgres;"
        
        # Restore backup
        docker-compose exec -T supabase-db psql -U postgres -d postgres < "$backup_file"
        
        print_status "Database restored"
    else
        print_info "Database restore cancelled"
    fi
}

# Function to show connection info
show_info() {
    print_info "Supabase Local Development Info:"
    echo ""
    echo "🗄️  Database:"
    echo "   Host: localhost"
    echo "   Port: 54322"
    echo "   Database: postgres"
    echo "   Username: postgres"
    echo "   Password: postgres"
    echo ""
    echo "🔧 API:"
    echo "   URL: http://localhost:54321"
    echo "   Anon Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOuoJy13Bq4TnCuN2FQk8zpYlGCGPMCelCIM"
    echo "   Service Role Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU"
    echo ""
    echo "📊 Supabase Studio:"
    echo "   URL: http://localhost:54324"
    echo ""
    echo "📁 Storage:"
    echo "   URL: http://localhost:54321/storage/v1"
    echo ""
    echo "⚡ Realtime:"
    echo "   URL: ws://localhost:54321/realtime/v1"
}

# Function to show status
show_status() {
    print_info "Supabase Service Status:"
    
    cd "$DOCKER_DIR"
    
    docker-compose -f docker-compose.full.yml ps \
        supabase-db \
        supabase-auth \
        supabase-rest \
        supabase-realtime \
        supabase-storage \
        supabase-kong \
        supabase-studio
}

# Main function
main() {
    case "${1:-help}" in
        "start")
            start_supabase
            show_info
            ;;
        "stop")
            stop_supabase
            ;;
        "restart")
            restart_supabase
            ;;
        "status")
            show_status
            ;;
        "health")
            check_health
            ;;
        "logs")
            show_logs "$2"
            ;;
        "reset")
            reset_db
            ;;
        "migrate")
            run_migrations
            ;;
        "backup")
            backup_db
            ;;
        "restore")
            restore_db "$2"
            ;;
        "info")
            show_info
            ;;
        "help"|*)
            echo "Supabase Local Development Manager"
            echo ""
            echo "Usage: $0 [command] [options]"
            echo ""
            echo "Commands:"
            echo "  start         Start all Supabase services"
            echo "  stop          Stop all Supabase services"
            echo "  restart       Restart all Supabase services"
            echo "  status        Show service status"
            echo "  health        Check service health"
            echo "  logs [svc]    Show logs (svc: db, auth, rest, realtime, storage, kong, studio, all)"
            echo "  reset         Reset database (deletes all data)"
            echo "  migrate       Run database migrations"
            echo "  backup        Create database backup"
            echo "  restore FILE  Restore database from backup"
            echo "  info          Show connection information"
            echo "  help          Show this help"
            echo ""
            echo "Examples:"
            echo "  $0 start                    # Start Supabase"
            echo "  $0 logs db                  # Show database logs"
            echo "  $0 backup                   # Create backup"
            echo "  $0 restore backup.sql       # Restore from backup"
            ;;
    esac
}

# Run main function
main "$@"