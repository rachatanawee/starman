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
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="w-full p-4 border-b bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 transition-colors">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <Filter className="h-5 w-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">{config.name}</h3>
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount} active
              </Badge>
            )}
            {!isOpen && hasActiveFilters && config.renderBadges && (
              <div className="flex items-center gap-2 ml-2 flex-wrap">
                {config.renderBadges(criteria, setCriteria)}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <>
                <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 text-xs">
                      <Save className="h-3 w-3 mr-1" />
                      Save
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
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
                  <X className="h-3 w-3 mr-1" />
                  Clear all
                </Button>
              </>
            )}
            <Dialog open={isLoadDialogOpen} onOpenChange={setIsLoadDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  <FolderOpen className="h-3 w-3 mr-1" />
                  Load
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
            <button onClick={() => setIsOpen(!isOpen)} className="p-1 hover:bg-white/50 rounded transition-colors">
              <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="p-4">
          {config.renderFilters(criteria, setCriteria)}
        </div>
      )}
    </div>
  )
}
