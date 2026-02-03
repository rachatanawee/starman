#!/bin/bash

# Copy UI components from spark-base to erp-prototype
echo "Copying UI components..."
cp -r apps/spark-base/components/ui apps/erp-prototype/components/
echo "✓ UI components copied"

# Copy tablecn components from spark-base to erp-prototype
echo "Copying tablecn components..."
cp -r apps/spark-base/components/tablecn apps/erp-prototype/components/
echo "✓ tablecn components copied"

# Copy other shared components
echo "Copying shared components..."
for component in breadcrumbs calendar-date-picker date-range-filter dynamic-title filter-panel mobile-menu page-title page-tracker page-transition project-layout project-sidebar project-switcher quick-search settings-aware-title theme-loader; do
  if [ -f "apps/spark-base/components/${component}.tsx" ]; then
    cp "apps/spark-base/components/${component}.tsx" "apps/erp-prototype/components/"
    echo "  ✓ ${component}.tsx"
  fi
done

echo ""
echo "Done! All components copied from spark-base to erp-prototype"
echo ""
echo "Note: You may need to update imports in erp-prototype to use local components instead of @spark/core"
