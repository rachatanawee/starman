'use client'

import { ProjectLayout, DynamicTitle, Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Input, useParams, useState } from '@/lib/common-exports'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Settings, Building2, DollarSign, Globe, Bell, Shield, Save, Palette, Star, Zap, Rocket, Heart, Sparkles as SparklesIcon } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { mockProjectsAPI } from '@/lib/mock-data'
import { useSettings, useSettingsActions } from '@/lib/settings-context'

export default function SettingsPage() {
  const params = useParams()
  const projectId = params.id as string
  const project = mockProjectsAPI.getSync(projectId)
  const settings = useSettings()
  const { updateTheme, updateAppName, updateAppIcon } = useSettingsActions()
  const [appName, setAppName] = useState(settings.app_name || 'Starman ERP')
  const [selectedIcon, setSelectedIcon] = useState(settings.app_icon || 'GitBranch')

  const availableIcons = [
    'GitBranch', 'Star', 'Zap', 'Rocket', 'Heart', 'Sparkles',
    'Building2', 'Settings', 'Shield', 'Globe'
  ]

  const themes = [
    { value: 'tangerine', label: 'Tangerine', color: 'bg-orange-500' },
    { value: 'ocean-breeze', label: 'Ocean Breeze', color: 'bg-blue-500' },
    { value: 'claude', label: 'Claude', color: 'bg-amber-600' },
    { value: 'forest-green', label: 'Forest Green', color: 'bg-green-600' },
    { value: 'royal-purple', label: 'Royal Purple', color: 'bg-purple-600' },
    { value: 'crimson-red', label: 'Crimson Red', color: 'bg-red-600' },
    { value: 'clean-slate', label: 'Clean Slate', color: 'bg-slate-600' },
    { value: 'twitter', label: 'Twitter Blue', color: 'bg-sky-500' },
  ]

  if (!project) {
    return (
      <ProjectLayout projectId={projectId}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600">Company not found</p>
          </div>
        </div>
      </ProjectLayout>
    )
  }

  return (
    <ProjectLayout projectId={projectId}>
      <DynamicTitle pageTitle="Settings" />
      <div className="p-6">
        <div className="bg-white border-b mb-6 -m-6 p-6">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">ERP Settings</h1>
              <p className="text-sm text-gray-600">Configure system preferences and business rules</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 max-w-4xl">
          {/* App Branding */}
          <Card className="border-primary/20">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-primary" />
                <CardTitle className="text-primary">App Branding</CardTitle>
              </div>
              <CardDescription>Customize application name and icon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-2 block">Application Name</Label>
                <Input 
                  value={appName}
                  onChange={(e) => setAppName(e.target.value)}
                  placeholder="Starman ERP"
                  className="max-w-md"
                />
              </div>
              <div>
                <Label className="mb-3 block">Application Icon</Label>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                  {availableIcons.map((iconName) => {
                    const IconComponent = (LucideIcons as any)[iconName]
                    return (
                      <button
                        key={iconName}
                        onClick={() => setSelectedIcon(iconName)}
                        className={`
                          p-3 rounded-lg border-2 transition-all hover:scale-110
                          ${selectedIcon === iconName
                            ? 'border-primary bg-primary/10 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300'
                          }
                        `}
                      >
                        {IconComponent && <IconComponent className="h-6 w-6 text-primary" />}
                      </button>
                    )
                  })}
                </div>
              </div>
              <Button 
                onClick={() => {
                  updateAppName(appName)
                  updateAppIcon(selectedIcon)
                }}
                className="bg-primary hover:bg-primary/90"
              >
                <Save className="h-4 w-4 mr-2" />
                Apply Branding
              </Button>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card className="border-primary/20">
            <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle className="text-primary">Theme & Appearance</CardTitle>
              </div>
              <CardDescription>Choose a color theme for the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="mb-3 block">Select Theme Color</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {themes.map((theme) => (
                    <button
                      key={theme.value}
                      onClick={() => updateTheme(theme.value)}
                      className={`
                        relative p-4 rounded-lg border-2 transition-all hover:scale-105
                        ${settings.theme_name === theme.value 
                          ? 'border-primary shadow-lg ring-2 ring-primary/20' 
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className={`w-12 h-12 rounded-full ${theme.color} shadow-md`} />
                        <span className="text-sm font-medium text-gray-700">
                          {theme.label}
                        </span>
                      </div>
                      {settings.theme_name === theme.value && (
                        <div className="absolute top-2 right-2">
                          <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Theme colors will be applied to sidebar, header, buttons, and all highlights throughout the system
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Company Profile */}
          <Card className="border-blue-200">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                <CardTitle className="text-primary">Company Profile</CardTitle>
              </div>
              <CardDescription>Basic company information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Company Name</Label>
                  <Input defaultValue={project?.name} />
                </div>
                <div>
                  <Label>Tax ID</Label>
                  <Input placeholder="0-1234-56789-01-2" />
                </div>
              </div>
              <div>
                <Label>Address</Label>
                <Input placeholder="123 Business Street, Bangkok 10110" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Phone</Label>
                  <Input placeholder="02-123-4567" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" placeholder="contact@company.com" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Settings */}
          <Card className="border-green-200">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                <CardTitle className="text-primary">Financial Settings</CardTitle>
              </div>
              <CardDescription>Currency and pricing configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Base Currency</Label>
                  <Select defaultValue="thb">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="thb">THB (฿)</SelectItem>
                      <SelectItem value="usd">USD ($)</SelectItem>
                      <SelectItem value="eur">EUR (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Fiscal Year Start</Label>
                  <Select defaultValue="jan">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jan">January</SelectItem>
                      <SelectItem value="apr">April</SelectItem>
                      <SelectItem value="oct">October</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Default VAT Rate (%)</Label>
                  <Input type="number" defaultValue="7" />
                </div>
                <div>
                  <Label>Default WHT Rate (%)</Label>
                  <Input type="number" defaultValue="3" />
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <div>
                  <Label>Auto-calculate Tax</Label>
                  <p className="text-sm text-gray-500">Automatically add VAT to prices</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Localization */}
          <Card className="border-primary/20">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                <CardTitle className="text-primary">Localization</CardTitle>
              </div>
              <CardDescription>Language and regional settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Default Language</Label>
                  <Select defaultValue="th">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="th">ไทย (Thai)</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Timezone</Label>
                  <Select defaultValue="bangkok">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bangkok">Bangkok (GMT+7)</SelectItem>
                      <SelectItem value="singapore">Singapore (GMT+8)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date Format</Label>
                  <Select defaultValue="dd/mm/yyyy">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                      <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                      <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Number Format</Label>
                  <Select defaultValue="comma">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comma">1,234.56</SelectItem>
                      <SelectItem value="period">1.234,56</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-primary/20">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle className="text-primary">Notifications</CardTitle>
              </div>
              <CardDescription>Alert preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Low Stock Alerts</Label>
                  <p className="text-sm text-gray-500">Notify when inventory is low</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Production Delays</Label>
                  <p className="text-sm text-gray-500">Alert on late production orders</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Payment Reminders</Label>
                  <p className="text-sm text-gray-500">Remind customers of due invoices</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>AI Insights</Label>
                  <p className="text-sm text-gray-500">Receive AI-powered recommendations</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card className="border-primary/20">
            <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-600" />
                <CardTitle className="text-primary">Security</CardTitle>
              </div>
              <CardDescription>Access control and data protection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-500">Require 2FA for all users</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Session Timeout</Label>
                  <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
                </div>
                <Select defaultValue="30">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 min</SelectItem>
                    <SelectItem value="30">30 min</SelectItem>
                    <SelectItem value="60">60 min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Audit Logging</Label>
                  <p className="text-sm text-gray-500">Track all system changes</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Reset to Default</Button>
            <Button className="bg-primary hover:bg-primary/90">
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </ProjectLayout>
  )
}
