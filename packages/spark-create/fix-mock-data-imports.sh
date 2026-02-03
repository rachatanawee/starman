#!/bin/bash

echo "Fixing mock data imports in modules..."

# Inventory module
find templates/modules/inventory -name "*.tsx" -type f -exec sed -i '' \
  -e "s|from '@/lib/mock-data'|from '@/modules/inventory/lib/mock-data'|g" \
  {} \;

# Manufacturing module  
find templates/modules/manufacturing -name "*.tsx" -type f -exec sed -i '' \
  -e "s|from '@/lib/mock-data'|from '@/modules/manufacturing/lib/mock-data'|g" \
  -e "s|from '@/lib/mock-data/bom-data'|from '@/modules/manufacturing/lib/mock-data/bom-data'|g" \
  {} \;

# Sales module
find templates/modules/sales -name "*.tsx" -type f -exec sed -i '' \
  -e "s|from '@/lib/mock-data'|from '@/modules/sales/lib/mock-data'|g" \
  {} \;

# Accounting module
find templates/modules/accounting -name "*.tsx" -type f -exec sed -i '' \
  -e "s|from '@/lib/mock-data'|from '@/modules/accounting/lib/mock-data'|g" \
  {} \;

# Factory Ops module
find templates/modules/factory-ops -name "*.tsx" -type f -exec sed -i '' \
  -e "s|from '@/lib/mock-data'|from '@/modules/factory-ops/lib/mock-data'|g" \
  {} \;

echo "✅ Mock data imports fixed!"
