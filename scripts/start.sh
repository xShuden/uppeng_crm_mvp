#!/bin/bash

# CRM v2 Development Start Script
# This script starts the development environment

set -e

echo "🚀 Starting CRM v2 Development Environment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check if Docker is running
if ! docker info >/dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start services based on argument
case "${1:-all}" in
    "backend")
        print_info "Starting backend only..."
        cd backend
        bun run dev
        ;;
    "frontend")
        print_info "Starting frontend only..."
        cd frontend
        yarn start
        ;;
    "db")
        print_info "Starting database only..."
        cd docker
        docker-compose up supabase-db
        ;;
    "docker")
        print_info "Starting full Docker environment..."
        cd docker
        docker-compose up
        ;;
    "all"|*)
        print_info "Starting full development environment..."
        cd docker
        
        # Start database first
        print_info "Starting database..."
        docker-compose up -d supabase-db redis
        
        # Wait a bit for database
        sleep 5
        
        # Start backend in background
        print_info "Starting backend..."
        cd ../backend
        bun run dev &
        BACKEND_PID=$!
        
        # Start frontend
        print_info "Starting frontend..."
        cd ../frontend
        yarn start &
        FRONTEND_PID=$!
        
        # Wait for user to stop
        print_status "Development environment is running!"
        echo ""
        echo "📱 Frontend: http://localhost:3000"
        echo "🔧 Backend API: http://localhost:3001"
        echo "🗄️  Database: localhost:54322"
        echo "📊 Supabase Studio: http://localhost:54323"
        echo ""
        echo "Press Ctrl+C to stop all services"
        
        # Trap Ctrl+C
        trap 'kill $BACKEND_PID $FRONTEND_PID; docker-compose -f docker/docker-compose.yml stop; exit' INT
        wait
        ;;
esac