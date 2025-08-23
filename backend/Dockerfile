# Use official Bun image
FROM oven/bun:1.0-alpine AS base

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1.0-alpine AS production

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install only production dependencies
RUN bun install --frozen-lockfile --production

# Copy built application
COPY --from=base /app/dist ./dist

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S bunjs -u 1001

# Change ownership of the app directory
RUN chown -R bunjs:nodejs /app

# Switch to non-root user
USER bunjs

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start the application
CMD ["bun", "run", "start"]