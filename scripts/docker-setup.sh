#!/bin/bash

# Docker Swarm & Production Setup Script
# This script sets up Docker Swarm and deploys the CRM application

set -e

echo "🐳 Docker Swarm Production Setup..."

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

# Check if running as root or with sudo
if [[ $EUID -eq 0 ]]; then
    print_warning "Running as root. Consider using a non-root user with docker group membership."
fi

# Check Docker installation
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check Docker Compose
if ! command -v docker-compose &> /dev/null; then
    if ! docker compose version &> /dev/null; then
        print_error "Docker Compose is not installed."
        exit 1
    fi
    COMPOSE_CMD="docker compose"
else
    COMPOSE_CMD="docker-compose"
fi

print_status "Docker and Docker Compose are installed"

# Function to setup Docker Swarm
setup_swarm() {
    print_info "Setting up Docker Swarm..."
    
    if docker info | grep -q "Swarm: active"; then
        print_warning "Docker Swarm is already active"
    else
        print_info "Initializing Docker Swarm..."
        MANAGER_IP=$(hostname -I | awk '{print $1}')
        docker swarm init --advertise-addr $MANAGER_IP
        print_status "Docker Swarm initialized"
        
        echo "To add worker nodes, run the following command on each worker:"
        docker swarm join-token worker
    fi
}

# Function to create Docker networks
setup_networks() {
    print_info "Setting up Docker networks..."
    
    if ! docker network ls | grep -q "traefik-public"; then
        docker network create --driver overlay traefik-public
        print_status "traefik-public network created"
    else
        print_warning "traefik-public network already exists"
    fi
}

# Function to create Docker secrets
setup_secrets() {
    print_info "Setting up Docker secrets..."
    
    # JWT Secret
    if ! docker secret ls | grep -q "crm_jwt_secret"; then
        print_info "Creating JWT secret..."
        openssl rand -base64 32 | docker secret create crm_jwt_secret -
        print_status "JWT secret created"
    else
        print_warning "JWT secret already exists"
    fi
    
    # Supabase Service Key
    if ! docker secret ls | grep -q "crm_supabase_service_key"; then
        print_info "Creating Supabase service key secret..."
        echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU" | docker secret create crm_supabase_service_key -\n        print_status \"Supabase service key secret created\"\n    else\n        print_warning \"Supabase service key secret already exists\"\n    fi\n    \n    # Grafana Admin Password\n    if ! docker secret ls | grep -q \"crm_grafana_admin_password\"; then\n        print_info \"Creating Grafana admin password...\"\n        read -sp \"Enter Grafana admin password: \" GRAFANA_PASSWORD\n        echo\n        echo \"$GRAFANA_PASSWORD\" | docker secret create crm_grafana_admin_password -\n        print_status \"Grafana admin password created\"\n    else\n        print_warning \"Grafana admin password already exists\"\n    fi\n}\n\n# Function to build and push images\nbuild_images() {\n    print_info \"Building application images...\"\n    \n    cd $(dirname $0)/../\n    \n    # Build backend image\n    print_info \"Building backend image...\"\n    docker build -t crm-v2-backend:latest backend/\n    print_status \"Backend image built\"\n    \n    # Build frontend image\n    print_info \"Building frontend image...\"\n    docker build -f frontend/Dockerfile.prod -t crm-v2-frontend:latest frontend/\n    print_status \"Frontend image built\"\n}\n\n# Function to deploy stack\ndeploy_stack() {\n    print_info \"Deploying CRM stack...\"\n    \n    cd $(dirname $0)/../docker\n    \n    # Check if .env file exists\n    if [ ! -f .env ]; then\n        print_warning \"No .env file found. Copying from .env.example\"\n        cp .env.example .env\n        print_error \"Please edit the .env file with your actual values before continuing.\"\n        exit 1\n    fi\n    \n    # Deploy the stack\n    docker stack deploy -c docker-compose.prod.yml --with-registry-auth crm-stack\n    print_status \"CRM stack deployed\"\n    \n    print_info \"Waiting for services to start...\"\n    sleep 30\n    \n    # Show stack status\n    print_info \"Stack services:\"\n    docker stack services crm-stack\n}\n\n# Function to setup monitoring\nsetup_monitoring() {\n    print_info \"Setting up monitoring stack...\"\n    \n    # Deploy monitoring services\n    print_info \"Monitoring services are included in the main stack\"\n    print_status \"Monitoring setup complete\"\n}\n\n# Function to show access URLs\nshow_urls() {\n    print_info \"Service URLs:\"\n    \n    if [ ! -z \"$DOMAIN_NAME\" ]; then\n        echo \"🌐 Frontend: https://$DOMAIN_NAME\"\n        echo \"🔧 API: https://api.$DOMAIN_NAME\"\n        echo \"📊 Grafana: https://grafana.$DOMAIN_NAME\"\n        echo \"🔍 Prometheus: https://prometheus.$DOMAIN_NAME\"\n        echo \"🚦 Traefik: https://traefik.$DOMAIN_NAME\"\n    else\n        MANAGER_IP=$(docker node ls --filter role=manager --format \"{{.Hostname}}\" | head -1)\n        echo \"🌐 Frontend: http://$MANAGER_IP\"\n        echo \"🔧 API: http://$MANAGER_IP:3001\"\n        echo \"📊 Grafana: http://$MANAGER_IP:3000\"\n        echo \"🔍 Prometheus: http://$MANAGER_IP:9090\"\n        echo \"🚦 Traefik: http://$MANAGER_IP:8080\"\n    fi\n}\n\n# Main deployment function\nmain() {\n    print_info \"Starting production deployment\"\n    echo \"\"\n    \n    # Load environment variables\n    if [ -f \"$(dirname $0)/../docker/.env\" ]; then\n        source \"$(dirname $0)/../docker/.env\"\n    fi\n    \n    case \"${1:-all}\" in\n        \"swarm\")\n            setup_swarm\n            ;;\n        \"networks\")\n            setup_networks\n            ;;\n        \"secrets\")\n            setup_secrets\n            ;;\n        \"build\")\n            build_images\n            ;;\n        \"deploy\")\n            deploy_stack\n            ;;\n        \"monitoring\")\n            setup_monitoring\n            ;;\n        \"urls\")\n            show_urls\n            ;;\n        \"all\"|*)\n            setup_swarm\n            setup_networks\n            setup_secrets\n            build_images\n            deploy_stack\n            setup_monitoring\n            show_urls\n            ;;\n    esac\n    \n    print_status \"Production deployment completed!\"\n    echo \"\"\n    print_info \"Useful commands:\"\n    echo \"  docker stack services crm-stack    # List services\"\n    echo \"  docker service logs crm-stack_backend -f  # View backend logs\"\n    echo \"  docker stack rm crm-stack          # Remove stack\"\n    echo \"  docker system prune -f             # Clean up\"\n}\n\n# Run main function\nmain \"$@\"