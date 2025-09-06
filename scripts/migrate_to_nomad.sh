#!/bin/bash

# Migration Script: Docker Swarm to HashiCorp Nomad & Consul
# This script migrates from Docker Swarm to Nomad/Consul infrastructure
# Author: DevOps Migration Script
# Date: 2025-09-06

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging function
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

# Function to check command success
check_status() {
    if [ $? -eq 0 ]; then
        log "✓ $1 completed successfully"
    else
        error "✗ $1 failed"
        exit 1
    fi
}

# Main migration process
main() {
    log "========================================="
    log "Starting Migration to Nomad & Consul"
    log "========================================="
    
    # Step 1: Check current Docker status
    info "Step 1: Checking current Docker services and containers"
    echo ""
    
    if command -v docker &> /dev/null; then
        log "Docker is installed"
        
        # Check Docker Swarm status
        if docker info 2>/dev/null | grep -q "Swarm: active"; then
            info "Docker Swarm is active"
            
            # List Swarm services
            info "Current Swarm services:"
            docker service ls 2>/dev/null || warning "No services found or Swarm not initialized"
            echo ""
            
            # List stack deployments
            info "Current stack deployments:"
            docker stack ls 2>/dev/null || warning "No stacks found"
            echo ""
        else
            info "Docker Swarm is not active"
        fi
        
        # List all containers
        info "Current Docker containers:"
        docker ps -a --format "table {{.Names}}\t{{.Status}}\t{{.Image}}"
        echo ""
        
        # Check for Portainer
        if docker ps -a | grep -q portainer; then
            info "Portainer container found"
        else
            info "No Portainer container found"
        fi
    else
        warning "Docker is not installed"
    fi
    
    # Step 2: Stop and remove Docker Swarm services
    log "Step 2: Cleaning up Docker Swarm services"
    
    if docker info 2>/dev/null | grep -q "Swarm: active"; then
        # Remove all stacks
        for stack in $(docker stack ls --format "{{.Name}}" 2>/dev/null); do
            info "Removing stack: $stack"
            docker stack rm "$stack"
            check_status "Stack $stack removal"
        done
        
        # Wait for services to be removed
        info "Waiting for services to be fully removed..."
        sleep 10
        
        # Remove any remaining services
        for service in $(docker service ls -q 2>/dev/null); do
            info "Removing service: $service"
            docker service rm "$service"
            check_status "Service $service removal"
        done
    else
        info "Swarm not active, skipping service removal"
    fi
    
    # Step 3: Stop and remove Portainer
    log "Step 3: Removing Portainer"
    
    if docker ps -a | grep -q portainer; then
        info "Stopping Portainer container..."
        docker stop portainer 2>/dev/null || warning "Portainer already stopped"
        
        info "Removing Portainer container..."
        docker rm portainer 2>/dev/null || warning "Portainer already removed"
        
        info "Removing Portainer volume..."
        docker volume rm portainer_data 2>/dev/null || warning "Portainer volume already removed or doesn't exist"
        
        check_status "Portainer cleanup"
    else
        info "No Portainer container to remove"
    fi
    
    # Step 4: Leave Docker Swarm
    log "Step 4: Leaving Docker Swarm"
    
    if docker info 2>/dev/null | grep -q "Swarm: active"; then
        info "Forcing leave from Swarm..."
        docker swarm leave --force
        check_status "Docker Swarm leave"
    else
        info "Not in Swarm mode, skipping"
    fi
    
    # Step 5: Clean up Docker resources
    log "Step 5: Cleaning up Docker resources"
    
    info "Stopping all remaining containers..."
    docker stop $(docker ps -aq) 2>/dev/null || info "No containers to stop"
    
    info "Removing all containers..."
    docker rm $(docker ps -aq) 2>/dev/null || info "No containers to remove"
    
    info "Removing unused volumes..."
    docker volume prune -f 2>/dev/null || info "No volumes to remove"
    
    info "Removing unused networks..."
    docker network prune -f 2>/dev/null || info "No networks to remove"
    
    info "Removing unused images..."
    docker image prune -a -f 2>/dev/null || info "No images to remove"
    
    info "Running system prune..."
    docker system prune -a -f --volumes 2>/dev/null || info "System already clean"
    
    check_status "Docker cleanup"
    
    # Step 6: Install HashiCorp repositories and tools
    log "Step 6: Installing HashiCorp Nomad and Consul"
    
    # Update system
    info "Updating system packages..."
    apt-get update -qq
    check_status "System update"
    
    # Install required packages
    info "Installing required packages..."
    apt-get install -y -qq wget gpg coreutils curl unzip
    check_status "Package installation"
    
    # Add HashiCorp GPG key
    info "Adding HashiCorp GPG key..."
    wget -O- https://apt.releases.hashicorp.com/gpg | \
        gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
    check_status "GPG key addition"
    
    # Add HashiCorp repository
    info "Adding HashiCorp repository..."
    echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] \
        https://apt.releases.hashicorp.com $(lsb_release -cs) main" | \
        tee /etc/apt/sources.list.d/hashicorp.list
    check_status "Repository addition"
    
    # Update package list
    info "Updating package list..."
    apt-get update -qq
    check_status "Package list update"
    
    # Install Consul
    info "Installing Consul..."
    apt-get install -y -qq consul
    check_status "Consul installation"
    
    # Install Nomad
    info "Installing Nomad..."
    apt-get install -y -qq nomad
    check_status "Nomad installation"
    
    # Step 7: Configure Consul
    log "Step 7: Configuring Consul"
    
    # Create Consul configuration directory
    mkdir -p /etc/consul.d
    
    # Create basic Consul configuration
    cat > /etc/consul.d/consul.hcl << 'EOF'
datacenter = "dc1"
data_dir = "/opt/consul"
log_level = "INFO"
server = true
bootstrap_expect = 1
ui_config {
  enabled = true
}

client_addr = "0.0.0.0"
bind_addr = "{{ GetPrivateInterfaces | include \"network\" \"10.0.0.0/8\" | attr \"address\" }}"

connect {
  enabled = true
}

ports {
  grpc = 8502
}

performance {
  raft_multiplier = 1
}

acl = {
  enabled = false
  default_policy = "allow"
}
EOF
    check_status "Consul configuration"
    
    # Step 8: Configure Nomad
    log "Step 8: Configuring Nomad"
    
    # Create Nomad configuration directory
    mkdir -p /etc/nomad.d
    
    # Create basic Nomad configuration
    cat > /etc/nomad.d/nomad.hcl << 'EOF'
datacenter = "dc1"
data_dir = "/opt/nomad"

server {
  enabled = true
  bootstrap_expect = 1
}

client {
  enabled = true
  servers = ["127.0.0.1"]
  
  options {
    "driver.raw_exec.enable" = "1"
    "docker.privileged.enabled" = "true"
  }
}

plugin "docker" {
  config {
    volumes {
      enabled = true
    }
    allow_privileged = true
  }
}

consul {
  address = "127.0.0.1:8500"
  
  server_service_name = "nomad"
  client_service_name = "nomad-client"
  auto_advertise = true
  server_auto_join = true
  client_auto_join = true
}

acl {
  enabled = false
}

ui {
  enabled = true
}

bind_addr = "0.0.0.0"

advertise {
  http = "{{ GetPrivateInterfaces | include \"network\" \"10.0.0.0/8\" | attr \"address\" }}"
  rpc  = "{{ GetPrivateInterfaces | include \"network\" \"10.0.0.0/8\" | attr \"address\" }}"
  serf = "{{ GetPrivateInterfaces | include \"network\" \"10.0.0.0/8\" | attr \"address\" }}"
}
EOF
    check_status "Nomad configuration"
    
    # Step 9: Create systemd service overrides for proper startup
    log "Step 9: Configuring systemd services"
    
    # Create Consul systemd override
    mkdir -p /etc/systemd/system/consul.service.d
    cat > /etc/systemd/system/consul.service.d/override.conf << 'EOF'
[Service]
Environment="CONSUL_BIND_INTERFACE=eth0"
Restart=always
RestartSec=5
EOF
    
    # Create Nomad systemd override
    mkdir -p /etc/systemd/system/nomad.service.d
    cat > /etc/systemd/system/nomad.service.d/override.conf << 'EOF'
[Service]
Environment="NOMAD_ADDR=http://127.0.0.1:4646"
Restart=always
RestartSec=5
EOF
    
    # Reload systemd
    systemctl daemon-reload
    check_status "Systemd configuration"
    
    # Step 10: Start services
    log "Step 10: Starting Consul and Nomad services"
    
    # Enable and start Consul
    info "Starting Consul..."
    systemctl enable consul
    systemctl start consul
    check_status "Consul startup"
    
    # Wait for Consul to be ready
    info "Waiting for Consul to be ready..."
    sleep 5
    
    # Check Consul status
    if consul members &>/dev/null; then
        log "Consul is running"
        consul members
    else
        error "Consul failed to start properly"
    fi
    
    # Enable and start Nomad
    info "Starting Nomad..."
    systemctl enable nomad
    systemctl start nomad
    check_status "Nomad startup"
    
    # Wait for Nomad to be ready
    info "Waiting for Nomad to be ready..."
    sleep 5
    
    # Check Nomad status
    if nomad server members &>/dev/null; then
        log "Nomad is running"
        nomad server members
    else
        error "Nomad failed to start properly"
    fi
    
    # Step 11: Configure firewall (if ufw is enabled)
    log "Step 11: Configuring firewall rules"
    
    if command -v ufw &> /dev/null && ufw status | grep -q "Status: active"; then
        info "Configuring UFW firewall rules..."
        
        # Consul ports
        ufw allow 8300/tcp comment 'Consul server RPC' || true
        ufw allow 8301/tcp comment 'Consul Serf LAN' || true
        ufw allow 8301/udp comment 'Consul Serf LAN' || true
        ufw allow 8302/tcp comment 'Consul Serf WAN' || true
        ufw allow 8302/udp comment 'Consul Serf WAN' || true
        ufw allow 8500/tcp comment 'Consul HTTP API' || true
        ufw allow 8502/tcp comment 'Consul gRPC' || true
        ufw allow 8600/tcp comment 'Consul DNS' || true
        ufw allow 8600/udp comment 'Consul DNS' || true
        
        # Nomad ports
        ufw allow 4646/tcp comment 'Nomad HTTP API' || true
        ufw allow 4647/tcp comment 'Nomad RPC' || true
        ufw allow 4648/tcp comment 'Nomad Serf' || true
        ufw allow 4648/udp comment 'Nomad Serf' || true
        
        check_status "Firewall configuration"
    else
        info "UFW not active, skipping firewall configuration"
    fi
    
    # Step 12: Display access information
    log "========================================="
    log "Migration Complete!"
    log "========================================="
    
    echo ""
    info "Access Points:"
    echo "  Consul UI: http://31.42.127.152:8500"
    echo "  Nomad UI:  http://31.42.127.152:4646"
    echo ""
    
    info "Service Status:"
    echo "  Consul: $(systemctl is-active consul)"
    echo "  Nomad:  $(systemctl is-active nomad)"
    echo ""
    
    info "Next Steps:"
    echo "  1. Access Nomad UI and verify cluster status"
    echo "  2. Access Consul UI and verify service discovery"
    echo "  3. Deploy your first Nomad job"
    echo "  4. Configure nginx reverse proxy for UI access (optional)"
    echo ""
    
    log "nginx and SSL certificates have been preserved"
    log "Docker is still available for Nomad jobs"
    
    # Show final status
    echo ""
    info "Cluster Status:"
    echo ""
    consul members 2>/dev/null || error "Cannot get Consul members"
    echo ""
    nomad server members 2>/dev/null || error "Cannot get Nomad members"
    echo ""
    nomad node status 2>/dev/null || error "Cannot get Nomad node status"
}

# Run main function
main

exit 0