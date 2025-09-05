# Multi-stage build for React CRM Application
FROM node:20-alpine AS deps
# Add libc6-compat for Alpine compatibility
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* yarn.lock* ./
# Install dependencies with better error handling
RUN npm ci --only=production --frozen-lockfile --legacy-peer-deps || \
    (rm -rf node_modules package-lock.json && npm install --only=production --legacy-peer-deps)

# Builder stage
FROM node:20-alpine AS builder
WORKDIR /app

# Copy package files and install all dependencies
COPY package.json package-lock.json* yarn.lock* ./
RUN npm ci --frozen-lockfile --legacy-peer-deps || \
    (rm -rf node_modules package-lock.json && npm install --legacy-peer-deps)

# Copy source code
COPY . .

# Build the React application
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false

RUN npm run build

# Production stage - Use Nginx to serve built React app
FROM nginx:1.25-alpine AS runner
WORKDIR /usr/share/nginx/html

# Remove default nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy built application from builder stage
COPY --from=builder /app/build .

# Create custom nginx configuration
RUN cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen 3000;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # Handle client-side routing (React Router)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Cache static assets for better performance
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Don't cache HTML files (for SPA updates)
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml
        application/rss+xml
        application/atom+xml
        image/svg+xml;

    # Health check endpoint for Docker
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
EOF

# Create non-root user and set permissions
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nginx -u 1001 -G nodejs && \
    chown -R nginx:nodejs /usr/share/nginx/html && \
    chown -R nginx:nodejs /var/cache/nginx && \
    chown -R nginx:nodejs /var/log/nginx && \
    chown -R nginx:nodejs /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nodejs /var/run/nginx.pid

# Switch to non-root user
USER nginx

# Expose port 3000 (same as React dev server for consistency)
EXPOSE 3000

# Health check for container monitoring
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start nginx in foreground
CMD ["nginx", "-g", "daemon off;"]