#!/bin/bash

# List of pages to update
pages=(
  "apps/erp-prototype/app/[locale]/(dashboard)/company/[id]/sales-invoice/page.tsx"
  "apps/erp-prototype/app/[locale]/(dashboard)/company/[id]/bom/page.tsx"
  "apps/erp-prototype/app/[locale]/(dashboard)/company/[id]/production-order/page.tsx"
  "apps/erp-prototype/app/[locale]/(dashboard)/company/[id]/production-planning/page.tsx"
  "apps/erp-prototype/app/[locale]/(dashboard)/company/[id]/mrp/page.tsx"
  "apps/erp-prototype/app/[locale]/(dashboard)/company/[id]/manufacturing/page.tsx"
  "apps/erp-prototype/app/[locale]/(dashboard)/company/[id]/wip-costing/page.tsx"
  "apps/erp-prototype/app/[locale]/(dashboard)/company/[id]/job-history/page.tsx"
  "apps/erp-prototype/app/[locale]/(dashboard)/company/[id]/factory-capacity/page.tsx"
  "apps/erp-prototype/app/[locale]/(dashboard)/company/[id]/worker-allowance/page.tsx"
  "apps/erp-prototype/app/[locale]/(dashboard)/company/[id]/purchasing/page.tsx"
  "apps/erp-prototype/app/[locale]/(dashboard)/company/[id]/inventory/page.tsx"
  "apps/erp-prototype/app/[locale]/(dashboard)/company/[id]/accounting/page.tsx"
  "apps/erp-prototype/app/[locale]/(dashboard)/company/[id]/dashboard/page.tsx"
  "apps/erp-prototype/app/[locale]/(dashboard)/company/[id]/settings/page.tsx"
  "apps/erp-prototype/app/[locale]/(dashboard)/company/[id]/ui-patterns/page.tsx"
)

for page in "${pages[@]}"; do
  if [ -f "$page" ]; then
    echo "Processing: $page"
    
    # Check if ProjectLayout is already imported
    if ! grep -q "ProjectLayout" "$page"; then
      # Add ProjectLayout to imports
      sed -i '' "s/import { /import { ProjectLayout, /" "$page"
      
      # Add ProjectLayout wrapper after "return ("
      sed -i '' 's/return (/return (\n    <ProjectLayout projectId={projectId}>/' "$page"
      
      # Add closing tag before last ")}"
      sed -i '' 's/^  )$/    <\/ProjectLayout>\n  )/' "$page"
      
      echo "  ✓ Updated"
    else
      echo "  - Already has ProjectLayout"
    fi
  else
    echo "  ✗ File not found: $page"
  fi
done

echo "Done!"
