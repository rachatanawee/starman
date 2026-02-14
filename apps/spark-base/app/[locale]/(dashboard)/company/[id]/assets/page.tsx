'use client'

import { useState } from 'react'
import { QrCode, Plus, User, Package, X } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Badge } from '@/shared/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { PageTitle } from '@/core/layout/page-title'
import { ProjectLayout } from '@/core/layout/project-layout'
import { FilterPanel, type FilterConfig, type FilterCriteria } from '@/shared/components/filter-panel'
import { QRScanner, AssetCard, AssetDetail, useAssets } from '@/modules/assets'
import type { Asset } from '@/modules/assets'
import { useParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import * as React from 'react'

export default function AssetsPage() {
  const params = useParams()
  const projectId = params.id as string
  const t = useTranslations('assets')
  const { assets, loading, getAssetByCode } = useAssets()
  const [showScanner, setShowScanner] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)

  const [filterCriteria, setFilterCriteria] = React.useState<FilterCriteria>({
    name: '',
    status: 'all',
    assignedTo: '',
    category: 'all'
  })

  const filterConfig: FilterConfig = {
    name: t('filters'),
    storageKey: 'assets',
    initialCriteria: {
      name: '',
      status: 'all',
      assignedTo: '',
      category: 'all'
    },
    renderFilters: (criteria, setCriteria) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <Package className="h-3 w-3" />
            {t('assetName')}
          </Label>
          <Input
            placeholder={t('searchAssets')}
            value={criteria.name}
            onChange={(e) => setCriteria('name', e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700 flex items-center gap-1">
            <User className="h-3 w-3" />
            {t('assignedTo')}
          </Label>
          <Input
            placeholder={t('searchAssignedTo')}
            value={criteria.assignedTo}
            onChange={(e) => setCriteria('assignedTo', e.target.value)}
            className="h-9"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">{t('status')}</Label>
          <Select value={criteria.status} onValueChange={(v) => setCriteria('status', v)}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder={t('allStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allStatus')}</SelectItem>
              <SelectItem value="active">{t('active')}</SelectItem>
              <SelectItem value="maintenance">{t('maintenance')}</SelectItem>
              <SelectItem value="retired">{t('retired')}</SelectItem>
              <SelectItem value="lost">{t('lost')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-medium text-gray-700">{t('category')}</Label>
          <Select value={criteria.category} onValueChange={(v) => setCriteria('category', v)}>
            <SelectTrigger className="h-9">
              <SelectValue placeholder={t('allCategories')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allCategories')}</SelectItem>
              <SelectItem value="equipment">{t('equipment')}</SelectItem>
              <SelectItem value="vehicle">{t('vehicle')}</SelectItem>
              <SelectItem value="furniture">{t('furniture')}</SelectItem>
              <SelectItem value="electronics">{t('electronics')}</SelectItem>
              <SelectItem value="other">{t('other')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    ),
    renderBadges: (criteria, setCriteria) => (
      <>
        {criteria.name && (
          <Badge variant="outline" className="gap-1">
            {t('assetName')}: {criteria.name}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('name', ''); }} />
          </Badge>
        )}
        {criteria.assignedTo && (
          <Badge variant="outline" className="gap-1">
            {t('assignedTo')}: {criteria.assignedTo}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('assignedTo', ''); }} />
          </Badge>
        )}
        {criteria.status !== 'all' && (
          <Badge variant="outline" className="gap-1">
            {t('status')}: {t(criteria.status as any)}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('status', 'all'); }} />
          </Badge>
        )}
        {criteria.category !== 'all' && (
          <Badge variant="outline" className="gap-1">
            {t('category')}: {t(criteria.category as any)}
            <X className="h-3 w-3 cursor-pointer" onClick={(e) => { e.stopPropagation(); setCriteria('category', 'all'); }} />
          </Badge>
        )}
      </>
    )
  }

  const filteredAssets = React.useMemo(() => {
    return assets.filter(asset => {
      const matchesName = !filterCriteria.name || 
        asset.name.toLowerCase().includes(filterCriteria.name.toLowerCase()) ||
        asset.code.toLowerCase().includes(filterCriteria.name.toLowerCase())
      const matchesAssignedTo = !filterCriteria.assignedTo || 
        (asset.assignedTo && asset.assignedTo.toLowerCase().includes(filterCriteria.assignedTo.toLowerCase()))
      const matchesStatus = filterCriteria.status === 'all' || asset.status === filterCriteria.status
      const matchesCategory = filterCriteria.category === 'all' || asset.category === filterCriteria.category
      
      return matchesName && matchesAssignedTo && matchesStatus && matchesCategory
    })
  }, [assets, filterCriteria])

  const handleScan = (code: string) => {
    const asset = getAssetByCode(code)
    setShowScanner(false)
    
    if (asset) {
      setSelectedAsset(asset)
    } else {
      alert(`${t('assetNotFound')}: ${code}`)
    }
  }

  const totalValue = React.useMemo(() => {
    return filteredAssets.reduce((sum, asset) => sum + asset.currentValue, 0)
  }, [filteredAssets])

  return (
    <ProjectLayout projectId={projectId}>
      <div className="w-full h-full">
        <div className="p-2 sm:p-3 lg:p-4 space-y-3 sm:space-y-3 lg:space-y-4">
          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <PageTitle
                icon={QrCode}
                title={t('title')}
                subtitle={t('subtitle')}
              />
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => setShowScanner(true)}
                  className="shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                >
                  <QrCode className="h-4 w-4 mr-2" />
                  {t('scanQR')}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t('addAsset')}
                </Button>
              </div>
            </div>
          </div>

          <div className="w-full">
            <FilterPanel
              config={filterConfig}
              criteria={filterCriteria}
              onCriteriaChange={setFilterCriteria}
            />
          </div>

          <div className="bg-white rounded-lg border shadow-sm p-4 sm:p-5 lg:p-6 space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200 p-4">
                <p className="text-sm text-blue-700 mb-1">{t('totalAssets')}</p>
                <p className="text-2xl font-bold text-blue-900">{filteredAssets.length}</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-4">
                <p className="text-sm text-green-700 mb-1">{t('active')}</p>
                <p className="text-2xl font-bold text-green-900">
                  {filteredAssets.filter(a => a.status === 'active').length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200 p-4">
                <p className="text-sm text-yellow-700 mb-1">{t('maintenance')}</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {filteredAssets.filter(a => a.status === 'maintenance').length}
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 p-4">
                <p className="text-sm text-purple-700 mb-1">{t('totalValue')}</p>
                <p className="text-2xl font-bold text-purple-900">
                  ฿{totalValue.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Assets List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
                <p className="mt-4 text-gray-600">{t('loadingAssets')}</p>
              </div>
            ) : filteredAssets.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border">
                <QrCode className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600">{t('noAssetsFound')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAssets.map(asset => (
                  <AssetCard
                    key={asset.id}
                    asset={asset}
                    onClick={() => setSelectedAsset(asset)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {showScanner && (
        <QRScanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
        />
      )}

      {/* Asset Detail Modal */}
      {selectedAsset && (
        <AssetDetail
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
        />
      )}
    </ProjectLayout>
  )
}
