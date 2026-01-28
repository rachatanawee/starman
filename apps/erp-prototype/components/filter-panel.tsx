'use client'

import { Button } from '@/components/ui/button'
import { Filter, X, ChevronDown, Save, FolderOpen } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import * as React from 'react'

export interface FilterCriteria {
  [key: string]: any
}

export interface FilterConfig {
  name: string
  storageKey: string
  initialCriteria: FilterCriteria
  renderFilters: (criteria: FilterCriteria, setCriteria: (key: string, value: any) => void) => React.ReactNode
  renderBadges?: (criteria: FilterCriteria, setCriteria: (key: string, value: any) => void) => React.ReactNode
}

interface FilterPanelProps {
  config: FilterConfig
  criteria: FilterCriteria
  onCriteriaChange: (criteria: FilterCriteria) => void
}

export function FilterPanel({ config, criteria, onCriteriaChange }: FilterPanelProps) {
  const [isOpen, setIsOpen] = React.useState(true)
  const [savedFilters, setSavedFilters] = React.useState<Array<{name: string, filters: FilterCriteria}>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`${config.storageKey}_savedFilters`)
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [filterName, setFilterName] = React.useState('')
  const [isSaveDialogOpen, setIsSaveDialogOpen] = React.useState(false)
  const [isLoadDialogOpen, setIsLoadDialogOpen] = React.useState(false)

  const hasActiveFilters = React.useMemo(() => {
    return Object.keys(criteria).some(key => {
      const value = criteria[key]
      const initial = config.initialCriteria[key]
      return value !== initial && value !== '' && value !== null && value !== undefined
    })
  }, [criteria, config.initialCriteria])

  const activeFilterCount = React.useMemo(() => {
    return Object.keys(criteria).filter(key => {
      const value = criteria[key]
      const initial = config.initialCriteria[key]
      return value !== initial && value !== '' && value !== null && value !== undefined
    }).length
  }, [criteria, config.initialCriteria])

  const setCriteria = (key: string, value: any) => {
    onCriteriaChange({ ...criteria, [key]: value })
  }

  const clearFilters = () => {
    onCriteriaChange(config.initialCriteria)
  }

  const saveFilter = () => {
    if (!filterName.trim()) return
    const newFilter = { name: filterName, filters: criteria }
    const updated = [...savedFilters, newFilter]
    setSavedFilters(updated)
    localStorage.setItem(`${config.storageKey}_savedFilters`, JSON.stringify(updated))
    setFilterName('')
    setIsSaveDialogOpen(false)
  }

  const loadFilter = (filters: FilterCriteria) => {
    onCriteriaChange(filters)
    setIsLoadDialogOpen(false)
  }

  const deleteFilter = (index: number) => {
    const updated = savedFilters.filter((_, i) => i !== index)
    setSavedFilters(updated)
    localStorage.setItem(`${config.storageKey}_savedFilters`, JSON.stringify(updated))
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden w-full max-w-full">
      <div className="w-full p-3 sm:p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-colors">
        <div className="flex items-start sm:items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap cursor-pointer min-w-0" onClick={() => setIsOpen(!isOpen)}>
            <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 shrink-0" />
            <h3 className="font-semibold text-sm sm:text-base text-gray-900">{config.name}</h3>
            {hasActiveFilters && (
              <Badge variant="secondary" className="text-xs">
                {activeFilterCount} active
              </Badge>
            )}
            {!isOpen && hasActiveFilters && config.renderBadges && (
              <div className="flex items-center gap-2 flex-wrap">
                {config.renderBadges(criteria, setCriteria)}
              </div>
            )}
          </div>
          <div className="flex items-center gap-1 sm:gap-2 shrink-0 flex-wrap">
            {hasActiveFilters && (
              <>
                <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-7 sm:h-8 text-xs px-2 sm:px-3">
                      <Save className="h-3 w-3 sm:mr-1" />
                      <span className="hidden sm:inline">Save</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Save Filter</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Filter name"
                        value={filterName}
                        onChange={(e) => setFilterName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveFilter()}
                      />
                      <Button onClick={saveFilter} className="w-full">Save</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 sm:h-8 text-xs px-2 sm:px-3">
                  <X className="h-3 w-3 sm:mr-1" />
                  <span className="hidden sm:inline">Clear all</span>
                </Button>
              </>
            )}
            <Dialog open={isLoadDialogOpen} onOpenChange={setIsLoadDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 sm:h-8 text-xs px-2 sm:px-3">
                  <FolderOpen className="h-3 w-3 sm:mr-1" />
                  <span className="hidden sm:inline">Load</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Load Saved Filter</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  {savedFilters.length === 0 ? (
                    <p className="text-sm text-gray-500">No saved filters</p>
                  ) : (
                    savedFilters.map((saved, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded hover:bg-gray-50">
                        <button onClick={() => loadFilter(saved.filters)} className="flex-1 text-left">
                          {saved.name}
                        </button>
                        <Button variant="ghost" size="sm" onClick={() => deleteFilter(index)}>
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </DialogContent>
            </Dialog>
            <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-white/50 rounded transition-colors shrink-0">
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="p-3 sm:p-4 w-full">
          <div className="w-full max-w-full">
            {config.renderFilters(criteria, setCriteria)}
          </div>
        </div>
      )}
    </div>
  )
}
