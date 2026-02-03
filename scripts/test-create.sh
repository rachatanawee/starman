#!/bin/bash

# Script to test @spark/create locally without publishing
# Usage: ./scripts/test-create.sh [project-name]

set -e

PROJECT_NAME=${1:-test-spark-project}
TEST_DIR="../test-projects"

echo "🧪 Testing @spark/create locally"
echo ""

# Build CLI first
echo "🔨 Building @spark/create..."
cd packages/spark-create
bun install
bun run build
cd ../..
echo "✅ CLI built"
echo ""

# Create test directory
mkdir -p "$TEST_DIR"

# Remove old test project if exists
if [ -d "$TEST_DIR/$PROJECT_NAME" ]; then
  echo "🗑️  Removing old test project..."
  rm -rf "$TEST_DIR/$PROJECT_NAME"
fi

# Run CLI
echo "🚀 Creating project: $PROJECT_NAME"
echo ""

cd "$TEST_DIR"
node ../starman/packages/spark-create/dist/index.js "$PROJECT_NAME" --port 3200

# Check if project was created
if [ -d "$PROJECT_NAME" ]; then
  echo ""
  echo "✅ Project created successfully!"
  echo ""
  echo "📁 Project location: $TEST_DIR/$PROJECT_NAME"
  echo ""
  echo "Next steps:"
  echo "  cd $TEST_DIR/$PROJECT_NAME"
  echo "  bun run dev"
  echo ""
else
  echo ""
  echo "❌ Project creation failed"
  exit 1
fi
