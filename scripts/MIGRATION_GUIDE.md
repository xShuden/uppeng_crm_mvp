# Migration Guide: Docker Swarm to HashiCorp Nomad

## Overview

This guide documents the migration process from Docker Swarm to HashiCorp Nomad and Consul for orchestration and service discovery.

## Prerequisites

- GitHub repository with `DEPLOY_SSH_KEY` secret configured
- Root SSH access to server 31.42.127.152
- Ubuntu server with Docker already installed
- nginx and SSL certificates (will be preserved)

## Migration Process

### 1. Pre-Migration Checklist

- [ ] Ensure all critical data is backed up
- [ ] Document current Docker Swarm services
- [ ] Test SSH connectivity to server
- [ ] Review nginx configurations
- [ ] Notify team of planned migration

### 2. Execute Migration

1. Go to GitHub Actions in your repository
2. Select "Migrate to Nomad Infrastructure" workflow
3. Click "Run workflow"
4. Enter configuration:
   - **Confirm**: Type `MIGRATE` (case-sensitive)
   - **Backup**: Check to create backup (recommended)
5. Click "Run workflow" button

### 3. Migration Steps

The automated migration will:

1. **Pre-Migration Check**
   - Verify SSH connectivity
   - Check current Docker/Swarm status
   - Display server information

2. **Backup** (if enabled)
   - Save Docker service configurations
   - Export stack definitions
   - Backup nginx configurations
   - Store in `/root/backups/migration-TIMESTAMP/`

3. **Migration Execution**
   - Stop all Docker Swarm services
   - Remove Portainer
   - Leave Docker Swarm mode
   - Clean up Docker resources
   - Install HashiCorp Nomad and Consul
   - Configure both services
   - Start Nomad and Consul
   - Configure firewall rules

4. **Post-Migration Validation**
   - Verify Nomad is running
   - Verify Consul is running
   - Check service accessibility
   - Confirm nginx is still running
   - Validate Docker is still available

### 4. Access Points After Migration

- **Consul UI**: http://31.42.127.152:8500
- **Nomad UI**: http://31.42.127.152:4646

### 5. Post-Migration Tasks

#### Configure nginx Reverse Proxy (Optional)

Add to nginx configuration for secure access:

```nginx
# Nomad UI
location /nomad/ {
    proxy_pass http://localhost:4646/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}

# Consul UI
location /consul/ {
    proxy_pass http://localhost:8500/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```

#### Deploy First Nomad Job

Create a test job file `test.nomad`:

```hcl
job "test-app" {
  datacenters = ["dc1"]
  type = "service"

  group "web" {
    count = 1

    task "nginx" {
      driver = "docker"

      config {
        image = "nginx:alpine"
        ports = ["http"]
      }

      resources {
        cpu    = 100
        memory = 128
      }

      service {
        name = "test-nginx"
        port = "http"
        
        check {
          type     = "http"
          path     = "/"
          interval = "10s"
          timeout  = "2s"
        }
      }
    }

    network {
      port "http" {
        static = 8080
      }
    }
  }
}
```

Deploy with: `nomad job run test.nomad`

## Rollback Process

If issues arise, you can rollback to Docker Swarm:

1. Go to GitHub Actions
2. Select "Rollback to Docker Swarm" workflow
3. Enter:
   - **Confirm**: Type `ROLLBACK`
   - **Reason**: Describe why rollback is needed
4. Run workflow

The rollback will:
- Stop Nomad and Consul services
- Reinitialize Docker Swarm
- Reinstall Portainer
- Restore ability to deploy Docker stacks

## Troubleshooting

### Common Issues

#### Nomad Won't Start
```bash
# Check logs
journalctl -u nomad -n 50

# Verify configuration
nomad config validate /etc/nomad.d/nomad.hcl

# Reset Nomad data
systemctl stop nomad
rm -rf /opt/nomad/*
systemctl start nomad
```

#### Consul Won't Start
```bash
# Check logs
journalctl -u consul -n 50

# Verify configuration
consul validate /etc/consul.d/

# Reset Consul data
systemctl stop consul
rm -rf /opt/consul/*
systemctl start consul
```

#### Port Conflicts
```bash
# Check port usage
netstat -tulpn | grep -E "(4646|4647|4648|8500|8301|8302)"

# Kill conflicting processes
fuser -k 4646/tcp  # For Nomad
fuser -k 8500/tcp  # For Consul
```

### Manual Cleanup

If automated cleanup fails:

```bash
# Stop all Docker containers
docker stop $(docker ps -aq)
docker rm $(docker ps -aq)

# Leave swarm
docker swarm leave --force

# Clean Docker system
docker system prune -a -f --volumes

# Remove Nomad/Consul (if rolling back)
systemctl stop nomad consul
apt-get remove --purge nomad consul
rm -rf /opt/nomad /opt/consul /etc/nomad.d /etc/consul.d
```

## Security Considerations

1. **Firewall Rules**: The migration opens several ports. Consider restricting access:
   ```bash
   # Restrict Nomad/Consul UI to specific IPs
   ufw allow from YOUR_IP to any port 4646
   ufw allow from YOUR_IP to any port 8500
   ```

2. **Enable ACLs**: After migration, enable ACLs for production:
   - Nomad: Edit `/etc/nomad.d/nomad.hcl` and set `acl.enabled = true`
   - Consul: Edit `/etc/consul.d/consul.hcl` and set `acl.enabled = true`

3. **TLS Encryption**: Configure TLS for Nomad and Consul communication

## Monitoring

After migration, set up monitoring:

1. **Prometheus Metrics**
   - Nomad: http://31.42.127.152:4646/v1/metrics
   - Consul: http://31.42.127.152:8500/v1/agent/metrics

2. **Health Checks**
   ```bash
   # Nomad health
   curl http://localhost:4646/v1/agent/health

   # Consul health
   curl http://localhost:8500/v1/agent/self
   ```

## Support

For issues or questions:
1. Check the GitHub Actions logs
2. SSH to server and check service logs
3. Review this guide's troubleshooting section
4. Create an issue in the repository