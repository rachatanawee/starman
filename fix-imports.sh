#!/bin/bash

echo "Fixing imports from @spark/core to local components..."

# Find all .tsx and .ts files in erp-prototype
find apps/erp-prototype -type f \( -name "*.tsx" -o -name "*.ts" \) -not -path "*/node_modules/*" | while read file; do
  # Check if file contains @spark/core imports
  if grep -q "@spark/core" "$file"; then
    echo "Processing: $file"
    
    # Replace DataGrid imports
    sed -i '' "s|from '@spark/core'|from '@/components/tablecn/data-grid/data-grid'|g" "$file" 2>/dev/null || true
    sed -i '' "s|import { DataGrid } from '@/components/tablecn/data-grid/data-grid'|import { DataGrid } from '@/components/tablecn/data-grid/data-grid'|g" "$file" 2>/dev/null || true
    
    # Replace UI component imports
    sed -i '' "s|import { \(.*\) } from '@spark/core'|import { \1 } from '@/components/ui/\L\1'|g" "$file" 2>/dev/null || true
  fi
done

echo "Done!"
