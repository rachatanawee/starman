#!/bin/bash

# Build and deploy web application
cd "$(dirname "$0")/.."
echo "Building web application..."

# Temporarily rename .env.local to avoid conflict
if [ -f .env.local ]; then
  mv .env.local .env.local.backup
  echo "Backed up .env.local"
fi

# Build with production env
NODE_ENV=production bun run build

# Restore .env.local
if [ -f .env.local.backup ]; then
  mv .env.local.backup .env.local
  echo "Restored .env.local"
fi

# Check if build succeeded
if [ $? -ne 0 ]; then
  echo "Build failed! Deployment aborted."
  exit 1
fi

echo "Build successful! Starting deployment..."

echo "Creating destination folder if not exists..."
ssh administrator@192.168.11.80 "mkdir -p /share/projectflow/apps/prototype"

echo "Stopping existing application..."
ssh administrator@192.168.11.80 "pm2 stop pf-prototype || true"

# Copy the built files to the server using rsync
echo "Deploying files to server..."

# 1. เอาไฟล์ Logic (server.js และ dependencies) ไปวาง
rsync -avz --delete --exclude='ecosystem.config.cjs' --exclude='.env' --exclude='.env.*' .next/standalone/ administrator@192.168.11.80:/share/projectflow/apps/prototype/

# 2. เอาไฟล์ Static (CSS, JS chunks) ไปวางในโฟลเดอร์ .next ของปลายทาง
rsync -avz --delete .next/static/ administrator@192.168.11.80:/share/projectflow/apps/prototype/.next/static/

# 3. เอาไฟล์ Public (รูปภาพ, favicon) ไปวาง
rsync -avz --delete public/ administrator@192.168.11.80:/share/projectflow/apps/prototype/public/

# 4. เอา .env.production ไปวาง (สำหรับ runtime บน server)
if [ -f .env.production ]; then
  rsync -avz .env.production administrator@192.168.11.80:/share/projectflow/apps/prototype/.env.production
fi

# 5. เอา ecosystem.config.cjs ไปวาง
rsync -avz ecosystem.config.cjs administrator@192.168.11.80:/share/projectflow/apps/prototype/ecosystem.config.cjs

# 6. Start/Restart the application
echo "Starting application..."
ssh administrator@192.168.11.80 "cd /share/projectflow/apps/prototype && pm2 delete pf-prototype 2>/dev/null || true && pm2 start ecosystem.config.cjs"

echo "Deployment completed!"
echo "Check status: ssh administrator@192.168.11.80 'pm2 status'"