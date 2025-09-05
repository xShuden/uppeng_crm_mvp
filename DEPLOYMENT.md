# CRM v2 Frontend - Docker Swarm Deployment Guide

Bu doküman CRM v2 React frontend uygulamasının Docker Swarm + Portainer ile test ortamına deployment sürecini açıklamaktadır.

## 🚀 Deployment Özellikleri

### Hedef Ortam
- **Environment**: Test
- **URL**: http://test-8xpm.uppeng.co
- **Docker Swarm**: Stack deployment
- **Container Registry**: GitHub Container Registry (ghcr.io)
- **Management**: Portainer UI

### Teknolojiler
- **Frontend**: React + TypeScript + Bootstrap
- **Build Tool**: Create React App
- **Container**: Docker + Nginx Alpine
- **Orchestration**: Docker Swarm
- **Management**: Portainer
- **CI/CD**: GitHub Actions

## 📋 Gereksinimler

### GitHub Secrets
Aşağıdaki secrets'ları GitHub repository ayarlarında tanımlamanız gerekiyor:

#### Yöntem 1: Direct Docker Swarm (Önerilen)
```bash
DOCKER_HOST=tcp://your-server:2376        # Docker daemon endpoint
DOCKER_TLS_VERIFY=1                       # Enable TLS (optional)
DOCKER_CA_CERT=<base64-encoded-ca.pem>    # CA certificate (optional)
DOCKER_CLIENT_CERT=<base64-encoded-cert.pem> # Client certificate (optional)
DOCKER_CLIENT_KEY=<base64-encoded-key.pem>   # Client key (optional)
```

#### Yöntem 2: Portainer API (Fallback)
```bash
PORTAINER_URL=https://your-portainer.com  # Portainer instance URL
PORTAINER_USERNAME=admin                  # Portainer admin username
PORTAINER_PASSWORD=your-password          # Portainer admin password
```

### Docker Swarm Cluster
- Docker Swarm mode initialized
- `uppeng_network` overlay network
- Registry access (GitHub Container Registry)

## 🔧 Deployment Süreci

### Otomatik Deployment
GitHub Actions workflow otomatik olarak çalışır:

1. **Push to master** - Ana branch'e push yapıldığında
2. **Pull Request** - Master'a PR açıldığında (sadece build)
3. **Manual Trigger** - GitHub Actions UI'dan manuel tetikleme

### Workflow Adımları

1. **Build Stage**
   ```yaml
   - Checkout code
   - Setup Docker Buildx
   - Login to GitHub Container Registry
   - Build React app with production config
   - Create optimized Docker image (Nginx + React build)
   - Push to registry with branch-sha tag
   ```

2. **Deploy Stage**
   ```yaml
   - Generate docker-compose.deploy.yml for stack
   - Setup remote Docker context (if DOCKER_HOST provided)
   - Deploy stack to Docker Swarm
   - Or deploy via Portainer API (fallback)
   - Verify deployment and run health checks
   ```

## 📁 Dosya Yapısı

```
├── .github/workflows/
│   └── deploy-test.yml          # GitHub Actions workflow (Docker Swarm)
├── frontend/
│   ├── Dockerfile              # Multi-stage React + Nginx build
│   ├── .dockerignore           # Docker ignore rules
│   ├── package.json            # React app dependencies
│   └── src/                    # React source code
└── DEPLOYMENT.md               # Bu doküman
```

## 🐳 Docker Stack Configuration

### Stack Name
- **Stack**: `uppeng-crm-stack`
- **Service**: `uppeng-crm-frontend`
- **Network**: `uppeng_network` (overlay)

### docker-compose.deploy.yml (Auto-generated)
```yaml
version: '3.8'
services:
  uppeng-crm-frontend:
    image: ghcr.io/xshuden/uppeng-crm-frontend:master-<sha>
    environment:
      NODE_ENV: production
      ENVIRONMENT: test
    ports:
      - "3000:3000"
    networks:
      - uppeng_network
    deploy:
      replicas: 1
      update_config:
        parallelism: 1
        failure_action: rollback
    healthcheck:
      test: ["CMD", "wget", "--spider", "http://localhost:3000/health"]
      interval: 30s
```

## 🐳 Docker Image Details

### Build Specs
- **Base Images**: 
  - Build: `node:20-alpine`
  - Runtime: `nginx:1.25-alpine`
- **Port**: 3000
- **User**: Non-root (nginx:1001)
- **Size**: ~50MB
- **Health Check**: `/health` endpoint

### Build Process
1. **Dependencies**: Install npm packages
2. **Build**: `npm run build` (optimized production build)
3. **Runtime**: Nginx serves static files with React Router support

### No External Dependencies
- **No Supabase**: Pure frontend deployment
- **No Backend API**: Standalone React application
- **No Database**: Static assets only

## ⚙️ Docker Swarm Configuration

### Service Deployment
```bash
# Deploy stack
docker stack deploy -c docker-compose.deploy.yml uppeng-crm-stack

# List services
docker stack services uppeng-crm-stack

# Check service logs
docker service logs uppeng-crm-stack_uppeng-crm-frontend
```

### Network & Ports
- **Network**: `uppeng_network` (overlay network)
- **Port Mapping**: 3000:3000
- **Load Balancing**: Docker Swarm internal

### Health Checks
- **Endpoint**: `GET /health`
- **Interval**: 30 seconds
- **Timeout**: 10 seconds
- **Start Period**: 40 seconds

## 🔍 Monitoring & Debugging

### Stack Management
```bash
# List all stacks
docker stack ls

# List services in stack
docker stack services uppeng-crm-stack

# List tasks/containers
docker stack ps uppeng-crm-stack

# Remove stack
docker stack rm uppeng-crm-stack
```

### Service Logs
```bash
# Service logs
docker service logs -f uppeng-crm-stack_uppeng-crm-frontend

# Container logs (if you know container ID)
docker logs <container_id>
```

### Health Check
```bash
# Test health endpoint
curl http://test-8xpm.uppeng.co/health

# Test main application
curl http://test-8xpm.uppeng.co/
```

### Portainer UI
- Stack management via Portainer web interface
- Real-time logs and metrics
- Container resource usage
- Service scaling and updates

## 🐛 Troubleshooting

### Common Issues

1. **Image Pull Errors**
   ```bash
   # Verify registry access
   docker pull ghcr.io/xshuden/uppeng-crm-frontend:latest
   
   # Check service status
   docker service ps uppeng-crm-stack_uppeng-crm-frontend
   ```

2. **Service Not Starting**
   ```bash
   # Check service events
   docker service ps --no-trunc uppeng-crm-stack_uppeng-crm-frontend
   
   # Check node resources
   docker node ls
   docker node inspect <node-id>
   ```

3. **Network Issues**
   ```bash
   # Check overlay networks
   docker network ls
   docker network inspect uppeng_network
   
   # Test internal connectivity
   docker run --rm --network uppeng_network alpine ping uppeng-crm-frontend
   ```

4. **Build Failures**
   - Check GitHub Actions logs
   - Verify Docker daemon connectivity
   - Test Docker build locally

### Local Testing
```bash
# Build locally
cd frontend
docker build -t uppeng-crm-local .

# Run locally (single container)
docker run -p 3000:3000 uppeng-crm-local

# Test health check
curl http://localhost:3000/health

# Test React routing
curl http://localhost:3000/dashboard
```

### Stack Recreation
```bash
# Complete stack recreation
docker stack rm uppeng-crm-stack
sleep 30
docker stack deploy -c docker-compose.deploy.yml uppeng-crm-stack
```

## 📊 Performance & Resources

### Resource Usage
- **Memory**: ~50MB per replica
- **CPU**: ~0.1 core under normal load
- **Storage**: Ephemeral only (~200MB image)
- **Network**: Internal overlay + external port 3000

### Scaling
```bash
# Scale service (via Portainer or CLI)
docker service scale uppeng-crm-stack_uppeng-crm-frontend=3

# Update service image
docker service update --image ghcr.io/xshuden/uppeng-crm-frontend:new-tag uppeng-crm-stack_uppeng-crm-frontend
```

### Build Performance
- **Build Time**: ~2-3 minutes (with cache)
- **Image Size**: ~50MB (optimized)
- **Cold Start**: ~10-15 seconds

## 🔄 Rollback & Updates

### Rolling Updates
Docker Swarm automatically handles rolling updates:

```bash
# Check rollout status
docker service ps uppeng-crm-stack_uppeng-crm-frontend

# Rollback to previous image
docker service rollback uppeng-crm-stack_uppeng-crm-frontend
```

### Manual Rollback
```bash
# List previous images
docker image ls ghcr.io/xshuden/uppeng-crm-frontend

# Update to specific tag
docker service update --image ghcr.io/xshuden/uppeng-crm-frontend:master-abc123 uppeng-crm-stack_uppeng-crm-frontend
```

## 📝 Production Considerations

### Security
- Non-root container user
- Security headers enabled
- No sensitive data in frontend
- TLS termination at load balancer

### Caching
- Static assets cached for 1 year
- HTML files not cached (SPA updates)
- Gzip compression enabled

### Monitoring
- Health check endpoint `/health`
- Docker Swarm service monitoring
- Portainer dashboard metrics
- Log aggregation via Docker logging drivers

## 🔗 URLs & Endpoints

- **Main Application**: http://test-8xpm.uppeng.co
- **Health Check**: http://test-8xpm.uppeng.co/health
- **Portainer**: https://your-portainer.com (if configured)

Bu deployment sistemi V1'deki Docker Swarm altyapısını kullanarak CRM v2 frontend'ini otomatik olarak deploy eder.