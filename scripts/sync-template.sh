#!/bin/bash

# Script to sync apps/spark-base to packages/spark-create/templates/base
# Usage: ./scripts/sync-template.sh

set -e

echo "🔄 Syncing spark-base template..."
echo ""

SOURCE_DIR="apps/spark-base"
TARGET_DIR="packages/spark-create/templates/base"

# Check if source exists
if [ ! -d "$SOURCE_DIR" ]; then
  echo "❌ Source directory $SOURCE_DIR not found!"
  exit 1
fi

# Remove old template
if [ -d "$TARGET_DIR" ]; then
  echo "  Removing old template..."
  rm -rf "$TARGET_DIR"
fi

# Create target directory
mkdir -p "$TARGET_DIR"

echo "  Copying files from $SOURCE_DIR to $TARGET_DIR..."

# Copy all files except excluded ones
rsync -av \
  --exclude='node_modules' \
  --exclude='.next' \
  --exclude='dist' \
  --exclude='.turbo' \
  --exclude='.env.local' \
  --exclude='bun.lockb' \
  "$SOURCE_DIR/" "$TARGET_DIR/"

echo ""
echo "✅ Template synced successfully!"
echo ""
echo "Next steps:"
echo "  1. Review changes: git diff packages/spark-create/templates/base"
echo "  2. Build package: cd packages/spark-create && bun run build"
echo "  3. Test locally: bun run dist/index.js test-project"
echo "  4. Publish: ./scripts/publish-packages.sh"
echo ""
