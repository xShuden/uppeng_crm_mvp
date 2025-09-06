#!/bin/bash

# Rollback Script: Nomad to Docker Swarm
# This script rolls back from Nomad/Consul to Docker Swarm infrastructure
# Author: DevOps Rollback Script
# Date: 2025-09-06

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log() {
    echo -e "${GREEN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

check_status() {
    if [ $? -eq 0 ]; then
        log "✓ $1 completed successfully"
    else
        error "✗ $1 failed"
        exit 1
    fi
}

# Main rollback process
main() {
    log "========================================="
    log "Starting Rollback to Docker Swarm"
    log "========================================="
    
    # Step 1: Stop Nomad jobs
    info "Step 1: Stopping Nomad jobs"
    
    if command -v nomad &> /dev/null && systemctl is-active --quiet nomad; then
        # List and stop all jobs
        for job in $(nomad job list -short 2>/dev/null); do
            info "Stopping job: $job"
            nomad job stop "$job" 2>/dev/null || warning "Failed to stop job $job"
        done
        
        # Wait for jobs to stop
        sleep 5
    else
        info "Nomad not running, skipping job cleanup"
    fi
    
    # Step 2: Stop and disable Nomad and Consul
    log "Step 2: Stopping Nomad and Consul services"
    
    # Stop Nomad
    if systemctl is-active --quiet nomad; then
        info "Stopping Nomad..."
        systemctl stop nomad
        systemctl disable nomad
        check_status "Nomad service stop"
    fi
    
    # Stop Consul
    if systemctl is-active --quiet consul; then
        info "Stopping Consul..."
        systemctl stop consul
        systemctl disable consul
        check_status "Consul service stop"
    fi
    
    # Step 3: Initialize Docker Swarm
    log "Step 3: Initializing Docker Swarm"
    
    if ! docker info 2>/dev/null | grep -q "Swarm: active"; then
        info "Initializing Docker Swarm..."
        docker swarm init --advertise-addr 31.42.127.152
        check_status "Docker Swarm initialization"
    else
        info "Docker Swarm already active"
    fi
    
    # Step 4: Reinstall Portainer
    log "Step 4: Installing Portainer"
    
    # Create Portainer volume
    docker volume create portainer_data
    
    # Run Portainer
    docker run -d \
        -p 9000:9000 \
        -p 9443:9443 \
        --name=portainer \
        --restart=always \
        -v /var/run/docker.sock:/var/run/docker.sock \
        -v portainer_data:/data \
        portainer/portainer-ce:latest
    
    check_status "Portainer installation"
    
    # Step 5: Deploy original stack (if backup exists)
    log "Step 5: Checking for stack backups"
    
    LATEST_BACKUP=$(ls -t /root/backups/migration-*/docker-stacks.txt 2>/dev/null | head -1)
    
    if [ -f "$LATEST_BACKUP" ]; then
        info "Found backup at: $(dirname $LATEST_BACKUP)"
        echo "Stack information from backup:"
        cat "$LATEST_BACKUP"
        
        # Note: Actual stack deployment would require the original compose files
        warning "Manual stack deployment required using original compose files"
    else
        warning "No backup found. Manual stack deployment required"
    fi
    
    # Step 6: Clean up Nomad and Consul (optional)
    log "Step 6: Cleanup options"
    
    info "Nomad and Consul have been stopped but not removed"
    info "To completely remove them, run:"
    echo "  apt-get remove --purge nomad consul"
    echo "  rm -rf /opt/nomad /opt/consul"
    echo "  rm -rf /etc/nomad.d /etc/consul.d"
    
    # Step 7: Display status
    log "========================================="
    log "Rollback Complete!"
    log "========================================="
    
    echo ""
    info "Docker Swarm Status:"
    docker info --format "Swarm: {{.Swarm.LocalNodeState}}"
    docker node ls
    
    echo ""
    info "Portainer Status:"
    docker ps | grep portainer || error "Portainer not running"
    
    echo ""
    info "Access Points:"
    echo "  Portainer: https://31.42.127.152:9443"
    echo ""
    
    info "Next Steps:"
    echo "  1. Access Portainer and verify it's working"
    echo "  2. Deploy your application stacks"
    echo "  3. Verify all services are running correctly"
    echo "  4. Update nginx configuration if needed"
}

# Run main function
main

exit 0