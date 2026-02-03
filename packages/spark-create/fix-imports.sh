#!/bin/bash

# Fix all @spark/core imports to use local paths

echo "Fixing imports in templates..."

# Replace specific component imports
find templates -name "*.tsx" -type f -exec sed -i '' \
  -e "s|import { ProjectLayout } from '@/core/layout/project-layout'|import { ProjectLayout } from '@/core/layout/project-layout'|g" \
  -e "s|import { DynamicTitle } from '@/core/layout/project-layout'|import { DynamicTitle } from '@/core/layout/dynamic-title'|g" \
  -e "s|import { FilterPanel, type FilterConfig, type FilterCriteria } from '@/core/layout/project-layout'|import { FilterPanel, type FilterConfig, type FilterCriteria } from '@/shared/components/filter-panel'|g" \
  -e "s|import { DateRangeFilter } from '@/core/layout/project-layout'|import { DateRangeFilter } from '@/shared/components/date-range-filter'|g" \
  -e "s|import { useSettings, useSettingsActions } from '@/core/layout/project-layout'|import { useSettings, useSettingsActions } from '@/core/settings/settings-context'|g" \
  -e "s|import { appConfig } from '@/core/layout/project-layout'|import { appConfig } from '@/lib/app.config'|g" \
  -e "s|import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/core/layout/project-layout'|import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui/card'|g" \
  -e "s|import { Button } from '@/core/layout/project-layout'|import { Button } from '@/shared/components/ui/button'|g" \
  -e "s|import { Input } from '@/core/layout/project-layout'|import { Input } from '@/shared/components/ui/input'|g" \
  -e "s|import { Label } from '@/core/layout/project-layout'|import { Label } from '@/shared/components/ui/label'|g" \
  -e "s|import { Textarea } from '@/core/layout/project-layout'|import { Textarea } from '@/shared/components/ui/textarea'|g" \
  -e "s|import { Badge } from '@/core/layout/project-layout'|import { Badge } from '@/shared/components/ui/badge'|g" \
  -e "s|import { Progress } from '@/core/layout/project-layout'|import { Progress } from '@/shared/components/ui/progress'|g" \
  -e "s|import { Select } from '@/core/layout/project-layout'|import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'|g" \
  -e "s|} from '@/core/layout/project-layout'|} from '@/shared/components/ui/select'|g" \
  -e "s|} from '@/core/layout/project-layout'|} from '@/shared/components/ui/table'|g" \
  {} \;

# Remove empty imports
find templates -name "*.tsx" -type f -exec sed -i '' \
  -e "s|import { } from '@/core/layout/project-layout' // card'||g" \
  -e "s|import { } from '@/core/layout/project-layout' // button'||g" \
  -e "s|import { } from '@/core/layout/project-layout' // input'||g" \
  -e "s|import { } from '@/core/layout/project-layout' // label'||g" \
  -e "s|import { } from '@/core/layout/project-layout' // textarea'||g" \
  -e "s|import { } from '@/core/layout/project-layout' // select'||g" \
  -e "s|import { } from '@/core/layout/project-layout' // badge'||g" \
  {} \;

echo "✅ Import paths fixed!"
