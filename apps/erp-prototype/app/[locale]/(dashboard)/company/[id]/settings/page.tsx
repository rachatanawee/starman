'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ProjectLayout } from '@/components/project-layout'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Settings, GitBranch, Sparkles, Save } from 'lucide-react'
import { mockProjectsAPI } from '@/lib/mock-data'

export default function SettingsPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  
  const project = mockProjectsAPI.getSync(projectId)

  if (!project) {
    return (
      <ProjectLayout projectId={projectId}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600">Project not found</p>
          </div>
        </div>
      </ProjectLayout>
    )
  }

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6">
        <div className="bg-white border-b mb-6 -m-6 p-6">
          <div className="flex items-center gap-3">
            <Settings className="h-8 w-8 text-purple-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Company Settings</h1>
              <p className="text-sm text-gray-600">Manage company configuration</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Basic company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Company Name</Label>
                <Input id="name" defaultValue={project?.name} />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={project?.description} rows={3} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget">Budget (THB)</Label>
                  <Input id="budget" type="number" defaultValue={project?.budget} />
                </div>
                <div>
                  <Label htmlFor="members">Team Size</Label>
                  <Input id="members" type="number" defaultValue={project?.members} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <GitBranch className="h-5 w-5 text-purple-600" />
                <CardTitle>GitLab Integration</CardTitle>
              </div>
              <CardDescription>Connect to your GitLab repository</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="gitlab-url">GitLab URL</Label>
                <Input id="gitlab-url" placeholder="https://gitlab.example.com/project" defaultValue={project?.gitlabUrl} />
              </div>
              <div>
                <Label htmlFor="gitlab-token">Access Token</Label>
                <Input id="gitlab-token" type="password" placeholder="glpat-xxxxxxxxxxxx" />
              </div>
              <Button variant="outline">Test Connection</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                <CardTitle>AI Provider</CardTitle>
              </div>
              <CardDescription>Configure AI features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="ai-provider">Provider</Label>
                <Input id="ai-provider" defaultValue={project?.aiProvider} />
              </div>
              <div>
                <Label htmlFor="ai-key">API Key</Label>
                <Input id="ai-key" type="password" placeholder="sk-xxxxxxxxxxxx" />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline">Cancel</Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </ProjectLayout>
  )
}
