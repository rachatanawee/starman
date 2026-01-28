'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ProjectLayout } from '@/components/project-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Users, Mail, Calendar } from 'lucide-react'
import { mockUsers, mockProjectsAPI } from '@/lib/mock-data'

export default function TeamPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string
  
  const project = mockProjectsAPI.getSync(projectId)

  const getTeamMembers = () => {
    if (projectId === '2') {
      // WMS Project: 1 PM + 2 SA + 3 PG
      return [
        { ...mockUsers[1], role: 'Project Manager' },
        { ...mockUsers[0], role: 'System Analyst' },
        { ...mockUsers[2], role: 'System Analyst' },
        { ...mockUsers[3], role: 'Programmer' },
        { ...mockUsers[4], role: 'Programmer' },
        { id: '6', name: 'Oliver Queen', email: 'david@example.com', avatar: '👨💻', role: 'Programmer' }
      ]
    }
    // Default team for other projects
    const roles = ['Developer', 'Business Analyst', 'Project Manager', 'Designer', 'QA Engineer']
    return mockUsers.map((user, idx) => ({
      ...user,
      role: roles[idx % roles.length]
    }))
  }

  const teamMembers = getTeamMembers()

  return (
    <ProjectLayout projectId={projectId}>
      <div className="p-6">
        <div className="bg-white border-b mb-6 -m-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
              <p className="text-sm text-gray-600">{teamMembers.length} members</p>
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <Card key={member.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                    {member.avatar}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <Badge variant="outline" className="mt-1">
                      {member.role}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Joined {new Date(2024, idx, 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Tasks: {Math.floor(Math.random() * 10) + 5}</span>
                      <span>Hours: {Math.floor(Math.random() * 80) + 40}h</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProjectLayout>
  )
}
