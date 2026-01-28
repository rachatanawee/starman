'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ProjectLayout } from '@/components/project-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, GitBranch, Sparkles, DollarSign, Link as LinkIcon } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function NewProjectPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    gitlabUrl: '',
    gitlabToken: '',
    owner: '',
    budget: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    aiProvider: 'openai',
    members: '1',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (!formData.name.trim()) {
      toast.error('Company name is required')
      return
    }
    if (!formData.gitlabUrl.trim()) {
      toast.error('GitLab project URL is required')
      return
    }
    if (!formData.gitlabToken.trim()) {
      toast.error('GitLab access token is required')
      return
    }
    if (!formData.budget || parseFloat(formData.budget) <= 0) {
      toast.error('Valid budget is required')
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock project creation
      const newProject = {
        id: `proj-${Date.now()}`,
        name: formData.name,
        description: formData.description,
        gitlabUrl: formData.gitlabUrl,
        owner: formData.owner || 'Current User',
        budget: parseFloat(formData.budget),
        spent: 0,
        startDate: formData.startDate,
        endDate: formData.endDate,
        aiProvider: formData.aiProvider,
        members: parseInt(formData.members),
        createdAt: new Date().toISOString(),
      }

      toast.success('Company created successfully!')
      
      // Redirect to project dashboard
      router.push(`/${locale}/company/${newProject.id}/dashboard`)
    } catch {
      toast.error('Failed to create company')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ProjectLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <Link 
              href={`/${locale}/company`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Companies
            </Link>
            <div className="flex items-center gap-3">
              <div className="bg-purple-500 p-2 rounded-lg">
                <GitBranch className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Create New Company</h1>
                <p className="text-gray-600 mt-1">Set up a new ERP company</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5 text-purple-600" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Enter the basic details about your company
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Company Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="e.g., ABC Manufacturing Co."
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of your company..."
                    value={formData.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="owner" className="text-sm font-medium">
                    Company Owner
                  </Label>
                  <Input
                    id="owner"
                    placeholder="e.g., John Doe"
                    value={formData.owner}
                    onChange={(e) => handleChange('owner', e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* GitLab Integration */}
            <Card className="border-2 border-blue-200">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <LinkIcon className="h-5 w-5 text-blue-600" />
                  GitLab Integration
                </CardTitle>
                <CardDescription>
                  Connect your GitLab project for issue tracking and synchronization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <div className="space-y-2">
                  <Label htmlFor="gitlabUrl" className="text-sm font-medium">
                    GitLab Project URL <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="gitlabUrl"
                    type="url"
                    placeholder="https://gitlab.example.com/group/project"
                    value={formData.gitlabUrl}
                    onChange={(e) => handleChange('gitlabUrl', e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Full URL to your GitLab project (e.g., https://gitlab.com/username/project)
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gitlabToken" className="text-sm font-medium">
                    GitLab Access Token <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="gitlabToken"
                    type="password"
                    placeholder="glpat-xxxxxxxxxxxxxxxxxxxx"
                    value={formData.gitlabToken}
                    onChange={(e) => handleChange('gitlabToken', e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Personal access token with API access. Create one in GitLab Settings → Access Tokens
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-sm text-blue-900 mb-2">Required Token Permissions:</h4>
                  <ul className="text-xs text-blue-800 space-y-1">
                    <li>• <span className="font-medium">api</span> - Full API access</li>
                    <li>• <span className="font-medium">read_repository</span> - Read repository data</li>
                    <li>• <span className="font-medium">write_repository</span> - Create issues and merge requests</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Project Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Project Settings
                </CardTitle>
                <CardDescription>
                  Configure budget, timeline, and AI settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget" className="text-sm font-medium">
                      Budget (THB) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="budget"
                      type="number"
                      min="0"
                      step="1000"
                      placeholder="1000000"
                      value={formData.budget}
                      onChange={(e) => handleChange('budget', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="members" className="text-sm font-medium">
                      Team Size
                    </Label>
                    <Input
                      id="members"
                      type="number"
                      min="1"
                      placeholder="5"
                      value={formData.members}
                      onChange={(e) => handleChange('members', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate" className="text-sm font-medium">
                      Start Date
                    </Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleChange('startDate', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate" className="text-sm font-medium">
                      Target End Date
                    </Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleChange('endDate', e.target.value)}
                      min={formData.startDate}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aiProvider" className="text-sm font-medium">
                    AI Provider
                  </Label>
                  <Select value={formData.aiProvider} onValueChange={(value) => handleChange('aiProvider', value)}>
                    <SelectTrigger id="aiProvider">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="openai">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-green-600" />
                          OpenAI (GPT-4)
                        </div>
                      </SelectItem>
                      <SelectItem value="anthropic">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-orange-600" />
                          Anthropic (Claude)
                        </div>
                      </SelectItem>
                      <SelectItem value="gemini">
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-blue-600" />
                          Google (Gemini)
                        </div>
                      </SelectItem>
                      <SelectItem value="none">
                        <div className="flex items-center gap-2">
                          No AI Provider
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500">
                    Choose AI provider for task generation and project insights
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push(`/${locale}/company`)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <GitBranch className="h-4 w-4 mr-2" />
                    Create Company
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ProjectLayout>
  )
}
