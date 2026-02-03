#!/bin/bash

# Script to setup GitLab configuration
# Usage: ./scripts/setup-gitlab.sh

set -e

echo "🚀 GitLab Setup Script"
echo ""

# Check if .env.gitlab.local exists
if [ ! -f .env.gitlab.local ]; then
  echo "❌ .env.gitlab.local not found!"
  echo ""
  echo "Please create .env.gitlab.local with your GitLab configuration:"
  echo "  cp .env.gitlab .env.gitlab.local"
  echo "  # Edit .env.gitlab.local with your values"
  echo ""
  exit 1
fi

# Load environment variables
source .env.gitlab.local

# Validate required variables
if [ -z "$GITLAB_URL" ] || [ -z "$GITLAB_PROJECT_ID" ] || [ -z "$GITLAB_TOKEN" ] || [ -z "$GITLAB_GROUP" ]; then
  echo "❌ Missing required environment variables in .env.gitlab.local"
  echo ""
  echo "Required variables:"
  echo "  - GITLAB_URL"
  echo "  - GITLAB_PROJECT_ID"
  echo "  - GITLAB_TOKEN"
  echo "  - GITLAB_GROUP"
  echo ""
  exit 1
fi

echo "✅ Environment variables loaded"
echo ""

# Test GitLab connection
echo "🔍 Testing GitLab connection..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" \
  --header "PRIVATE-TOKEN: ${GITLAB_TOKEN}" \
  "${GITLAB_URL}/api/v4/projects/${GITLAB_PROJECT_ID}")

if [ "$HTTP_CODE" != "200" ]; then
  echo "❌ Failed to connect to GitLab (HTTP ${HTTP_CODE})"
  echo ""
  echo "Please check:"
  echo "  - GITLAB_URL is correct"
  echo "  - GITLAB_PROJECT_ID is correct"
  echo "  - GITLAB_TOKEN is valid and has correct permissions"
  echo ""
  exit 1
fi

echo "✅ GitLab connection successful"
echo ""

# Setup git remote
echo "🔗 Setting up git remote..."
REMOTE_URL="${GITLAB_URL}/${GITLAB_GROUP}/spark-framework.git"

if git remote get-url origin &> /dev/null; then
  echo "  Updating existing origin remote..."
  git remote set-url origin "$REMOTE_URL"
else
  echo "  Adding origin remote..."
  git remote add origin "$REMOTE_URL"
fi

echo "✅ Git remote configured: $REMOTE_URL"
echo ""

# Create .npmrc for publishing
echo "📦 Creating .npmrc for package publishing..."
cat > .npmrc << EOF
@spark:registry=${GITLAB_URL}/api/v4/projects/${GITLAB_PROJECT_ID}/packages/npm/
${GITLAB_URL#https:}//api/v4/projects/${GITLAB_PROJECT_ID}/packages/npm/:_authToken=\${GITLAB_TOKEN}
EOF

echo "✅ .npmrc created"
echo ""

# Update package.json files
echo "📝 Updating package.json files..."

# Update spark-create package.json
if [ -f packages/spark-create/package.json ]; then
  cat packages/spark-create/package.json | \
    jq --arg url "${GITLAB_URL}/api/v4/projects/${GITLAB_PROJECT_ID}/packages/npm/" \
       --arg repo "${GITLAB_URL}/${GITLAB_GROUP}/spark-framework.git" \
       '.publishConfig.registry = $url | .repository.url = $repo' \
    > packages/spark-create/package.json.tmp
  mv packages/spark-create/package.json.tmp packages/spark-create/package.json
  echo "  ✅ Updated packages/spark-create/package.json"
fi

# Update spark-core package.json
if [ -f packages/spark-core/package.json ]; then
  cat packages/spark-core/package.json | \
    jq --arg url "${GITLAB_URL}/api/v4/projects/${GITLAB_PROJECT_ID}/packages/npm/" \
       --arg repo "${GITLAB_URL}/${GITLAB_GROUP}/spark-framework.git" \
       '.publishConfig.registry = $url | .repository.url = $repo' \
    > packages/spark-core/package.json.tmp
  mv packages/spark-core/package.json.tmp packages/spark-core/package.json
  echo "  ✅ Updated packages/spark-core/package.json"
fi

echo ""
echo "✅ GitLab setup complete!"
echo ""
echo "Next steps:"
echo "  1. Review the changes in package.json files"
echo "  2. Commit and push to GitLab:"
echo "     git add ."
echo "     git commit -m 'Configure GitLab registry'"
echo "     git push -u origin main"
echo ""
echo "  3. Build and publish packages:"
echo "     ./scripts/publish-packages.sh"
echo ""
