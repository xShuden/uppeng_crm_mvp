#!/bin/bash

# Simple deployment script for CRM Frontend
set -e

IMAGE_TAG="ghcr.io/xshuden/uppeng-crm-frontend:latest"
SERVICE_NAME="uppeng-crm-frontend"

echo "🚀 Starting deployment..."

# Pull latest image
echo "📥 Pulling latest image..."
docker pull $IMAGE_TAG

# Stop and remove old container
echo "🗑️ Cleaning up old container..."
docker stop $SERVICE_NAME 2>/dev/null || true
docker rm $SERVICE_NAME 2>/dev/null || true

# Start new container
echo "📦 Starting new container..."
docker run -d \
  --name $SERVICE_NAME \
  --restart unless-stopped \
  -p 3000:3000 \
  $IMAGE_TAG

# Check if running
sleep 3
if docker ps | grep -q $SERVICE_NAME; then
  echo "✅ Deployment successful!"
  docker ps | grep $SERVICE_NAME
else
  echo "❌ Deployment failed!"
  docker logs $SERVICE_NAME
  exit 1
fi