'use client'

import { BOM } from '@/lib/mock-data'
import { ChevronRight, ChevronDown, Package, Wrench } from 'lucide-react'
import { useState } from 'react'

interface BOMTreeViewProps {
  bom: BOM
}

export function BOMTreeView({ bom }: BOMTreeViewProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set([10, 20, 30]))

  const toggleStep = (step: number) => {
    const newExpanded = new Set(expandedSteps)
    if (newExpanded.has(step)) {
      newExpanded.delete(step)
    } else {
      newExpanded.add(step)
    }
    setExpandedSteps(newExpanded)
  }

  const groupedItems = bom.items.reduce((acc, item) => {
    if (!acc[item.operationStep]) {
      acc[item.operationStep] = []
    }
    acc[item.operationStep].push(item)
    return acc
  }, {} as Record<number, typeof bom.items>)

  const steps = Object.keys(groupedItems).map(Number).sort((a, b) => a - b)

  return (
    <div className="space-y-2">
      {/* Root Product */}
      <div className="flex items-center gap-2 p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <Package className="h-5 w-5 text-primary" />
        <div className="flex-1">
          <div className="font-semibold text-primary">{bom.productName}</div>
          <div className="text-sm text-primary">{bom.productSku}</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-primary">
            ${bom.estimatedCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-primary">Estimated Cost</div>
        </div>
      </div>

      {/* Operation Steps */}
      <div className="ml-6 space-y-2">
        {steps.map((step) => {
          const items = groupedItems[step]
          const isExpanded = expandedSteps.has(step)
          const stepTotal = items.reduce((sum, item) => sum + item.totalCost, 0)

          return (
            <div key={step} className="border rounded-lg overflow-hidden">
              {/* Step Header */}
              <button
                onClick={() => toggleStep(step)}
                className="w-full flex items-center gap-2 p-3 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-600" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                )}
                <Wrench className="h-4 w-4 text-blue-600" />
                <div className="flex-1 text-left">
                  <div className="font-medium">Step {step}</div>
                  <div className="text-xs text-gray-600">{items.length} items</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium">
                    ${stepTotal.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </div>
                </div>
              </button>

              {/* Step Items */}
              {isExpanded && (
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="p-3 bg-white hover:bg-gray-50">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mt-2" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm">{item.componentName}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{item.componentSku}</div>
                          {item.notes && (
                            <div className="text-xs text-gray-600 mt-1 italic">{item.notes}</div>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm font-medium">
                            {item.quantity} {item.uom}
                          </div>
                          <div className="text-xs text-gray-500">
                            @ ${item.unitCost.toLocaleString('en-US')}
                          </div>
                          <div className="text-sm font-semibold text-blue-600 mt-1">
                            ${item.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </div>
                          {item.scrapFactor > 0 && (
                            <div className="text-xs text-orange-600 mt-0.5">
                              Scrap {item.scrapFactor}%
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
