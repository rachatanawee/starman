#!/bin/bash

# Script to build and publish packages to GitLab
# Usage: ./scripts/publish-packages.sh

set -e

echo "📦 Publishing Spark Packages to GitLab"
echo ""

# Load environment variables
if [ ! -f .env.gitlab.local ]; then
  echo "❌ .env.gitlab.local not found!"
  echo "Please run ./scripts/setup-gitlab.sh first"
  exit 1
fi

source .env.gitlab.local

# Validate token
if [ -z "$GITLAB_TOKEN" ]; then
  echo "❌ GITLAB_TOKEN is not set in .env.gitlab.local"
  exit 1
fi

# Remove trailing slash from GITLAB_URL if exists
GITLAB_URL="${GITLAB_URL%/}"

# Set registry URL
REGISTRY_URL="${GITLAB_URL}/api/v4/projects/${GITLAB_PROJECT_ID}/packages/npm/"

echo "🔨 Building packages..."
echo ""

# Build spark-create
echo "  Building @spark/create..."
cd packages/spark-create
bun install
bun run build
cd ../..
echo "  ✅ @spark/create built"

# Build spark-core
echo "  Building @spark/core..."
cd packages/spark-core
bun install
bun run build
cd ../..
echo "  ✅ @spark/core built"

echo ""
echo "📤 Publishing packages..."
echo ""

# Extract hostname without protocol for auth config
GITLAB_HOST="${GITLAB_URL#https://}"
GITLAB_HOST="${GITLAB_HOST#http://}"

# Create temporary .npmrc for authentication
TEMP_NPMRC=$(mktemp)
cat > "$TEMP_NPMRC" << EOF
@spark:registry=${REGISTRY_URL}
//${GITLAB_HOST}/api/v4/projects/${GITLAB_PROJECT_ID}/packages/npm/:_authToken=${GITLAB_TOKEN}
strict-ssl=false
EOF

echo "  Using registry: ${REGISTRY_URL}"
echo "  Auth host: //${GITLAB_HOST}/api/v4/projects/${GITLAB_PROJECT_ID}/packages/npm/"
echo "  ⚠️  SSL verification disabled (strict-ssl=false)"
echo ""

# Publish spark-create
echo "  Publishing @spark/create..."
cd packages/spark-create
npm publish --userconfig="$TEMP_NPMRC"
PUBLISH_EXIT_CODE=$?
cd ../..

if [ $PUBLISH_EXIT_CODE -ne 0 ]; then
  echo "  ❌ Failed to publish @spark/create"
  rm -f "$TEMP_NPMRC"
  exit 1
fi
echo "  ✅ @spark/create published"

# Publish spark-core
echo "  Publishing @spark/core..."
cd packages/spark-core
npm publish --userconfig="$TEMP_NPMRC"
PUBLISH_EXIT_CODE=$?
cd ../..

if [ $PUBLISH_EXIT_CODE -ne 0 ]; then
  echo "  ❌ Failed to publish @spark/core"
  rm -f "$TEMP_NPMRC"
  exit 1
fi
echo "  ✅ @spark/core published"

# Clean up
rm -f "$TEMP_NPMRC"

echo ""
echo "✅ All packages published successfully!"
echo ""
echo "View packages at:"
echo "  ${GITLAB_URL}/${GITLAB_GROUP}/spark-framework/-/packages"
echo ""
echo "To use the packages:"
echo "  # Setup registry first (one time)"
echo "  cat >> ~/.npmrc << EOF"
echo "@spark:registry=${REGISTRY_URL}"
echo "strict-ssl=false"
echo "EOF"
echo ""
echo "  # Create project"
echo "  bunx @spark/create my-project"
echo ""
