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

# Export token for npm
export GITLAB_TOKEN

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

# Publish spark-create
echo "  Publishing @spark/create..."
cd packages/spark-create
npm publish
cd ../..
echo "  ✅ @spark/create published"

# Publish spark-core
echo "  Publishing @spark/core..."
cd packages/spark-core
npm publish
cd ../..
echo "  ✅ @spark/core published"

echo ""
echo "✅ All packages published successfully!"
echo ""
echo "View packages at:"
echo "  ${GITLAB_URL}/${GITLAB_GROUP}/spark-framework/-/packages"
echo ""
echo "To use the packages:"
echo "  bunx @spark/create my-project"
echo ""
