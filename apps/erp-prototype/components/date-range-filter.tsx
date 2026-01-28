'use client'

import { Calendar } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface DateRangeFilterProps {
  dateFrom: string
  dateTo: string
  onDateFromChange: (value: string) => void
  onDateToChange: (value: string) => void
  label?: string
}

export function DateRangeFilter({
  dateFrom,
  dateTo,
  onDateFromChange,
  onDateToChange,
  label = 'Date Range'
}: DateRangeFilterProps) {
  return (
    <div className="space-y-2">
      <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
        <Calendar className="h-3 w-3" />
        {label}
      </Label>
      <div className="flex gap-2">
        <Input
          type="date"
          value={dateFrom}
          onChange={(e) => onDateFromChange(e.target.value)}
          className="h-9 flex-1"
          placeholder="From"
        />
        <Input
          type="date"
          value={dateTo}
          onChange={(e) => onDateToChange(e.target.value)}
          className="h-9 flex-1"
          placeholder="To"
        />
      </div>
    </div>
  )
}
