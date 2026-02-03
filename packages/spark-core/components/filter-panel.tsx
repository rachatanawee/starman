'use client'

import { Button } from './ui/button'
import { Filter, X, ChevronDown, Save, FolderOpen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Input } from './ui/input'
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
      if (saved) return JSON.parse(saved)
      // Mock data for demo
      const mockFilters = [
        { name: 'This Month', filters: { ...config.initialCriteria, dateFrom: '2026-01-01', dateTo: '2026-01-31' } },
        { name: 'High Priority', filters: { ...config.initialCriteria, status: 'urgent' } },
        { name: 'My Favorites', filters: { ...config.initialCriteria } }
      ]
      localStorage.setItem(`${config.storageKey}_savedFilters`, JSON.stringify(mockFilters))
      return mockFilters
    }
    return []
  })
  const [filterName, setFilterName] = React.useState('')
  const [isSaveDialogOpen, setIsSaveDialogOpen] = React.useState(false)
  const [isLoadDialogOpen, setIsLoadDialogOpen] = React.useState(false)
  const [loadedFilterName, setLoadedFilterName] = React.useState<string | null>(null)

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
    setLoadedFilterName(null)
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

  const loadFilter = (filters: FilterCriteria, name: string) => {
    onCriteriaChange(filters)
    setLoadedFilterName(name)
    setIsLoadDialogOpen(false)
  }

  const deleteFilter = (index: number) => {
    const updated = savedFilters.filter((_, i) => i !== index)
    setSavedFilters(updated)
    localStorage.setItem(`${config.storageKey}_savedFilters`, JSON.stringify(updated))
  }

  const getFilterSummary = (filters: FilterCriteria) => {
    const active = Object.entries(filters)
      .filter(([key, value]) => {
        const initial = config.initialCriteria[key]
        return value !== initial && value !== '' && value !== null && value !== undefined
      })
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ')
    return active || 'No filters'
  }

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden w-full max-w-full">
      <div className="w-full px-3 py-1.5 border-b bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/15 transition-colors">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 cursor-pointer min-w-0" onClick={() => setIsOpen(!isOpen)}>
            <Filter className="h-3.5 w-3.5 text-primary shrink-0" />
            <h3 className="font-semibold text-xs text-gray-900">{config.name}</h3>
            {loadedFilterName && (
              <span className="text-xs text-primary">• {loadedFilterName}</span>
            )}
            {hasActiveFilters && (
              <Badge variant="secondary" className="text-xs h-4 px-1.5">
                {activeFilterCount}
              </Badge>
            )}
            {!isOpen && hasActiveFilters && config.renderBadges && (
              <div className="flex items-center gap-2 flex-wrap">
                {config.renderBadges(criteria, setCriteria)}
              </div>
            )}
          </div>
          <div className="flex items-center gap-0.5 shrink-0">
            {hasActiveFilters && (
              <>
                <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Save className="h-3 w-3" />
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
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 w-6 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </>
            )}
            <Dialog open={isLoadDialogOpen} onOpenChange={setIsLoadDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <FolderOpen className="h-3 w-3" />
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
                    savedFilters.map((saved, index) => {
                      const summary = getFilterSummary(saved.filters)
                      return (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 bg-white rounded-lg hover:border-primary hover:bg-primary/5 transition-all">
                          <button onClick={() => loadFilter(saved.filters, saved.name)} className="flex-1 text-left min-w-0">
                            <div className="text-sm font-medium text-gray-700 hover:text-primary">{saved.name}</div>
                            <div className="text-xs text-gray-500 truncate mt-0.5">{summary}</div>
                          </button>
                          <Button variant="ghost" size="sm" onClick={() => deleteFilter(index)} className="text-gray-400 hover:text-red-600 hover:bg-red-50 ml-2 shrink-0">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )
                    })
                  )}
                </div>
              </DialogContent>
            </Dialog>
            <button onClick={() => setIsOpen(!isOpen)} className="p-0.5 hover:bg-white/50 rounded transition-colors shrink-0">
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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
