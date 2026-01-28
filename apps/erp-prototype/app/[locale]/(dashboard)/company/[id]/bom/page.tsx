'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Plus, Package, Eye, Edit, Layers, TrendingUp, AlertCircle, Search, Filter, X, BookOpen } from 'lucide-react'
import { ProjectLayout } from '@/components/project-layout'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { mockBOMs, BOM } from '@/lib/bom-data'
import { BOMTreeView } from '@/components/bom-tree-view'
import { useTranslations } from 'next-intl'

export default function BOMPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  const t = useTranslations('bom')
  const [boms] = useState<BOM[]>(mockBOMs)
  const [viewMode, setViewMode] = useState<'list' | 'tree'>('list')
  const [selectedForTree, setSelectedForTree] = useState<BOM | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')

  const filteredBOMs = useMemo(() => {
    return boms.filter(bom => {
      const matchesSearch = searchQuery === '' || 
        bom.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bom.productSku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        bom.bomNumber.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'active' && bom.isActive) ||
        (statusFilter === 'inactive' && !bom.isActive)
      
      return matchesSearch && matchesStatus
    })
  }, [boms, searchQuery, statusFilter])

  const handleNewBOM = () => {
    router.push(`/${params.locale}/company/${projectId}/bom/new`)
  }

  const handleEditBOM = (bom: BOM) => {
    router.push(`/${params.locale}/company/${projectId}/bom/${bom.id}/edit`)
  }

  const handleViewTree = (bom: BOM) => {
    setSelectedForTree(bom)
    setViewMode('tree')
  }

  const totalBOMs = boms.length
  const activeBOMs = boms.filter(b => b.isActive).length
  const avgCost = boms.reduce((sum, b) => sum + b.estimatedCost, 0) / boms.length

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-gray-600 mt-1">{t('subtitle')}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/guide?tab=production&section=bom">
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                {t('learnMore')}
              </Button>
            </Link>
            <Button onClick={handleNewBOM} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              {t('newBOM')}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('totalBOMs')}</p>
                  <p className="text-2xl font-bold mt-1">{totalBOMs}</p>
                </div>
                <Package className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('activeBOMs')}</p>
                  <p className="text-2xl font-bold mt-1">{activeBOMs}</p>
                </div>
                <Layers className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{t('averageCost')}</p>
                  <p className="text-2xl font-bold mt-1">
                    ${avgCost.toLocaleString('en-US', { maximumFractionDigits: 0 })}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                {viewMode === 'list' ? t('bomList') : t('bomStructure')}
              </CardTitle>
              <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'list' | 'tree')}>
                <TabsList>
                  <TabsTrigger value="list">{t('list')}</TabsTrigger>
                  <TabsTrigger value="tree">{t('tree')}</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {viewMode === 'list' && (
              <div className="mb-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={t('searchBOM')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 pr-9"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-gray-600" />
                    <Button
                      variant={statusFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setStatusFilter('all')}
                    >
                      {t('all')}
                    </Button>
                    <Button
                      variant={statusFilter === 'active' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setStatusFilter('active')}
                    >
                      {t('active')}
                    </Button>
                    <Button
                      variant={statusFilter === 'inactive' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setStatusFilter('inactive')}
                    >
                      {t('inactive')}
                    </Button>
                  </div>
                </div>
                {(searchQuery || statusFilter !== 'all') && (
                  <div className="text-sm text-gray-600">
                    Found {filteredBOMs.length} of {boms.length} BOMs
                  </div>
                )}
              </div>
            )}
            {viewMode === 'list' ? (
              <div className="space-y-3">
                {filteredBOMs.length > 0 ? (
                  filteredBOMs.map((bom) => (
                    <div
                      key={bom.id}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-lg">{bom.productName}</h3>
                            {bom.isDefault && (
                              <Badge variant="default" className="bg-purple-600">{t('default')}</Badge>
                            )}
                            {!bom.isActive && (
                              <Badge variant="secondary">{t('inactive')}</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Package className="h-4 w-4" />
                              {bom.productSku}
                            </span>
                            <span>{t('bomNumber')}: {bom.bomNumber}</span>
                            <span>{t('revision')}: {bom.revision}</span>
                            <span>{bom.items.length} {t('items')}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{bom.description}</p>
                          <div className="flex items-center gap-4 mt-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Estimated Cost:</span>
                              <span className="font-semibold text-blue-600">
                                ${bom.estimatedCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Yield Rate:</span>
                              <span className="font-medium">{bom.yieldRate}%</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewTree(bom)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            {t('viewTree')}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditBOM(bom)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            {t('edit')}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p>{t('noBOMsFound')}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3"
                      onClick={() => {
                        setSearchQuery('')
                        setStatusFilter('all')
                      }}
                    >
                      {t('clearFilters')}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {selectedForTree ? (
                  <div>
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{selectedForTree.productName}</h3>
                        <p className="text-sm text-gray-600">{t('bomNumber')}: {selectedForTree.bomNumber} | {t('revision')}: {selectedForTree.revision}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedForTree(null)}
                      >
                        {t('backToList')}
                      </Button>
                    </div>
                    <BOMTreeView bom={selectedForTree} />
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">{t('selectBOM')}</p>
                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => setViewMode('list')}
                    >
                      {t('backToList')}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProjectLayout>
  )
}
