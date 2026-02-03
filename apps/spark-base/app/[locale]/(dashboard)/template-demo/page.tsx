'use client'

import { ProjectLayout, Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@/lib/common-exports'
import { Code, Sparkles, Database, Settings as SettingsIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { 
  mockDataGenerator, 
  generateDocuments, 
  generateTransactions,
  generateTasks,
  generateItems,
} from '@/lib/mock-data/index'
import { 
  statusUtils, 
  formatUtils, 
  calcUtils,
  validationUtils,
} from '@/lib/business-utils'
import { appConfig } from '@/lib/app.config'

export default function TemplateDemoPage() {
  const [generatedData, setGeneratedData] = useState<any[]>([])
  const [dataType, setDataType] = useState<string>('')

  const generateSampleData = (type: string) => {
    setDataType(type)
    switch (type) {
      case 'documents':
        setGeneratedData(generateDocuments(5))
        break
      case 'transactions':
        setGeneratedData(generateTransactions(5))
        break
      case 'tasks':
        setGeneratedData(generateTasks(5))
        break
      case 'items':
        setGeneratedData(generateItems(5))
        break
    }
  }

  const [sampleTransactions] = useState(() => generateTransactions(10))
  const [totalAmount, setTotalAmount] = useState(0)
  const [avgAmount, setAvgAmount] = useState(0)

  useEffect(() => {
    setTotalAmount(calcUtils.sum(sampleTransactions, 'amount'))
    setAvgAmount(calcUtils.average(sampleTransactions, 'amount'))
  }, [sampleTransactions])

  return (
    <ProjectLayout projectId="1">
      <div className="p-6 space-y-6">
        <div className="bg-white border-b -m-6 p-6 mb-6">
          <div className="flex items-center gap-3">
            <Code className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Template Demo</h1>
              <p className="text-sm text-gray-600">Showcase of reusable utilities and components</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl space-y-6">
          {/* App Configuration */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5 text-primary" />
                <CardTitle className="text-primary">App Configuration</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">App Name</p>
                  <p className="text-lg">{appConfig.app.defaultName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Version</p>
                  <p className="text-lg">{appConfig.app.version}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Available Icons</p>
                  <p className="text-sm text-gray-600">{appConfig.icons.length} icons</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Available Themes</p>
                  <p className="text-sm text-gray-600">{appConfig.themes.length} themes</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Feature Flags</p>
                <div className="flex gap-2 flex-wrap">
                  {Object.entries(appConfig.features).map(([key, value]) => (
                    <Badge key={key} variant={value ? 'default' : 'outline'}>
                      {key}: {value ? 'ON' : 'OFF'}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mock Data Generator */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <CardTitle className="text-primary">Mock Data Generator</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                <Button onClick={() => generateSampleData('documents')} variant="outline">
                  Generate Documents
                </Button>
                <Button onClick={() => generateSampleData('transactions')} variant="outline">
                  Generate Transactions
                </Button>
                <Button onClick={() => generateSampleData('tasks')} variant="outline">
                  Generate Tasks
                </Button>
                <Button onClick={() => generateSampleData('items')} variant="outline">
                  Generate Items
                </Button>
              </div>

              {generatedData.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Generated {dataType} ({generatedData.length} items)
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4 overflow-x-auto max-h-96">
                    <pre className="text-xs">
                      {JSON.stringify(generatedData, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Business Utilities */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="text-primary">Business Utilities</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Format Utils */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Format Utilities</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600">Currency</p>
                    <p className="text-lg font-mono">{formatUtils.currency(1234567.89)}</p>
                    <code className="text-xs text-gray-500">formatUtils.currency(1234567.89)</code>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600">Number</p>
                    <p className="text-lg font-mono">{formatUtils.number(1234567)}</p>
                    <code className="text-xs text-gray-500">formatUtils.number(1234567)</code>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600">Percentage</p>
                    <p className="text-lg font-mono">{formatUtils.percentage(85.5)}</p>
                    <code className="text-xs text-gray-500">formatUtils.percentage(85.5)</code>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600">Date</p>
                    <p className="text-lg font-mono">{formatUtils.date(new Date())}</p>
                    <code className="text-xs text-gray-500">formatUtils.date(new Date())</code>
                  </div>
                </div>
              </div>

              {/* Calc Utils */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Calculation Utilities</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600">Total Amount</p>
                    <p className="text-lg font-mono">{formatUtils.currency(totalAmount)}</p>
                    <code className="text-xs text-gray-500">calcUtils.sum(items, 'amount')</code>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600">Average Amount</p>
                    <p className="text-lg font-mono">{formatUtils.currency(avgAmount)}</p>
                    <code className="text-xs text-gray-500">calcUtils.average(items, 'amount')</code>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600">Percentage</p>
                    <p className="text-lg font-mono">{formatUtils.percentage(calcUtils.percentage(50, 200))}</p>
                    <code className="text-xs text-gray-500">calcUtils.percentage(50, 200)</code>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600">Growth</p>
                    <p className="text-lg font-mono">{formatUtils.percentage(calcUtils.growth(150, 100))}</p>
                    <code className="text-xs text-gray-500">calcUtils.growth(150, 100)</code>
                  </div>
                </div>
              </div>

              {/* Status Utils */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Status Utilities</p>
                <div className="flex gap-2 flex-wrap">
                  {['Completed', 'Pending', 'Rejected', 'Draft', 'Processing'].map(status => (
                    <Badge 
                      key={status}
                      variant={statusUtils.getVariant(status)}
                      className={statusUtils.getColor(status)}
                    >
                      {status}
                    </Badge>
                  ))}
                </div>
                <code className="text-xs text-gray-500 mt-2 block">
                  statusUtils.getVariant() / statusUtils.getColor()
                </code>
              </div>

              {/* Validation Utils */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Validation Utilities</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant={validationUtils.isEmail('test@example.com') ? 'default' : 'destructive'}>
                      {validationUtils.isEmail('test@example.com') ? '✓' : '✗'}
                    </Badge>
                    <code>validationUtils.isEmail('test@example.com')</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={validationUtils.isPositiveNumber(100) ? 'default' : 'destructive'}>
                      {validationUtils.isPositiveNumber(100) ? '✓' : '✗'}
                    </Badge>
                    <code>validationUtils.isPositiveNumber(100)</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={validationUtils.isInRange(50, 0, 100) ? 'default' : 'destructive'}>
                      {validationUtils.isInRange(50, 0, 100) ? '✓' : '✗'}
                    </Badge>
                    <code>validationUtils.isInRange(50, 0, 100)</code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Code Examples */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary" />
                <CardTitle className="text-primary">Usage Examples</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                <pre>{`import { appConfig } from '@/lib/app.config'
import { generateTransactions } from '@/lib/mock-data'
import { formatUtils, calcUtils } from '@/lib/business-utils'

// Generate mock data
const data = generateTransactions(20)

// Calculate totals
const total = calcUtils.sum(data, 'amount')
const formatted = formatUtils.currency(total)

// Use app config
const appName = appConfig.app.defaultName
const themes = appConfig.themes`}</pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProjectLayout>
  )
}
