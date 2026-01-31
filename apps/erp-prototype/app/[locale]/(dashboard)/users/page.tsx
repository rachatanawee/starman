'use client'

import { useState } from 'react'
import { ProjectLayout } from '@/components/project-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Users, Plus, Edit, Trash2, Shield, Search, X, Building2 } from 'lucide-react'
import { mockUsers, roleLabels, statusLabels, type User, type UserRole, type UserStatus } from '@/lib/user-data'
import { mockProjects } from '@/lib/mock-data'
import { FloatingUndo, InlineFeedback } from '@/components/feedback'

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [undoAction, setUndoAction] = useState<{ message: string; action: () => void } | null>(null)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === 'all' || user.role === filterRole
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    return matchesSearch && matchesRole && matchesStatus
  })

  const handleEdit = (user: User) => {
    setEditingUser({ ...user })
  }

  const handleDelete = (userId: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      const oldUsers = [...users]
      const deletedUser = users.find(u => u.id === userId)
      setUsers(users.filter(u => u.id !== userId))
      setUndoAction({
        message: `${deletedUser?.name} deleted`,
        action: () => setUsers(oldUsers)
      })
    }
  }

  const handleSave = () => {
    if (!editingUser) return
    
    if (!editingUser.name || !editingUser.email) {
      setFeedback({ type: 'error', message: 'Name and email are required' })
      return
    }

    const oldUsers = [...users]
    if (editingUser.id) {
      setUsers(users.map(u => u.id === editingUser.id ? editingUser : u))
      setUndoAction({
        message: `${editingUser.name} updated`,
        action: () => setUsers(oldUsers)
      })
    } else {
      const newUser = { ...editingUser, id: Date.now().toString() }
      setUsers([...users, newUser])
      setUndoAction({
        message: `${newUser.name} created`,
        action: () => setUsers(oldUsers)
      })
    }
    setEditingUser(null)
  }

  const handleNewUser = () => {
    setEditingUser({
      id: '',
      name: '',
      email: '',
      role: 'viewer',
      status: 'active',
      department: '',
      phone: '',
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: '',
      permissions: { sales: false, production: false, inventory: false, purchasing: false, accounting: false, reports: false, settings: false },
      companyAccess: []
    })
  }

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      case 'suspended': return 'bg-red-100 text-red-800'
    }
  }

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-primary/10 text-primary'
      case 'manager': return 'bg-blue-100 text-blue-800'
      case 'accountant': return 'bg-green-100 text-green-800'
      case 'production_manager': return 'bg-orange-100 text-orange-800'
      case 'warehouse_staff': return 'bg-yellow-100 text-yellow-800'
      case 'sales': return 'bg-pink-100 text-pink-800'
      case 'viewer': return 'bg-gray-100 text-gray-800'
    }
  }

  const getCompanyName = (id: string) => mockProjects.find(p => p.id === id)?.name || `Company ${id}`

  return (
    <ProjectLayout>
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">User Management</h1>
            <p className="text-gray-600 mt-1">Manage users and their permissions</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90" onClick={handleNewUser}>
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Label>Role</Label>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {Object.entries(roleLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Status</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {Object.entries(statusLabels).map(([key, label]) => (
                      <SelectItem key={key} value={key}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {editingUser && (
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{editingUser.id ? 'Edit User' : 'Add New User'}</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setEditingUser(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {feedback && (
                <InlineFeedback
                  type={feedback.type}
                  message={feedback.message}
                  onDismiss={() => setFeedback(null)}
                />
              )}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Role</Label>
                  <Select value={editingUser.role} onValueChange={(v) => setEditingUser({ ...editingUser, role: v as UserRole })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(roleLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={editingUser.status} onValueChange={(v) => setEditingUser({ ...editingUser, status: v as UserStatus })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(statusLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>{label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Department</Label>
                  <Input
                    value={editingUser.department}
                    onChange={(e) => setEditingUser({ ...editingUser, department: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Building2 className="h-4 w-4" />
                  Company Access
                </Label>
                <div className="grid grid-cols-2 gap-3 border rounded-lg p-4 bg-white">
                  {mockProjects.map(company => (
                    <div key={company.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`company-${company.id}`}
                        checked={editingUser.companyAccess.includes(company.id)}
                        onCheckedChange={(checked) => {
                          const newAccess = checked
                            ? [...editingUser.companyAccess, company.id]
                            : editingUser.companyAccess.filter(id => id !== company.id)
                          setEditingUser({ ...editingUser, companyAccess: newAccess })
                        }}
                      />
                      <label htmlFor={`company-${company.id}`} className="text-sm cursor-pointer">
                        {company.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <Label className="flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4" />
                  Module Permissions
                </Label>
                <div className="grid grid-cols-2 gap-3 border rounded-lg p-4 bg-white">
                  {Object.entries(editingUser.permissions).map(([module, enabled]) => (
                    <div key={module} className="flex items-center justify-between">
                      <Label className="capitalize">{module}</Label>
                      <Switch
                        checked={enabled}
                        onCheckedChange={(checked) => 
                          setEditingUser({
                            ...editingUser,
                            permissions: { ...editingUser.permissions, [module]: checked }
                          })
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setEditingUser(null)}>Cancel</Button>
                <Button className="bg-primary hover:bg-primary/90" onClick={handleSave}>Save</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 gap-4">
          {filteredUsers.map(user => (
            <Card key={user.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{user.name}</h3>
                      <Badge className={getRoleColor(user.role)}>{roleLabels[user.role]}</Badge>
                      <Badge className={getStatusColor(user.status)}>{statusLabels[user.status]}</Badge>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                      <div>
                        <p className="font-medium">Email</p>
                        <p>{user.email}</p>
                      </div>
                      <div>
                        <p className="font-medium">Department</p>
                        <p>{user.department}</p>
                      </div>
                      <div>
                        <p className="font-medium">Phone</p>
                        <p>{user.phone}</p>
                      </div>
                      <div>
                        <p className="font-medium">Last Login</p>
                        <p>{user.lastLogin}</p>
                      </div>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-medium text-gray-700 mb-1">Company Access:</p>
                      <div className="flex flex-wrap gap-2">
                        {user.companyAccess.map(companyId => (
                          <Badge key={companyId} variant="outline" className="text-xs bg-blue-50">
                            <Building2 className="h-3 w-3 mr-1" />
                            {getCompanyName(companyId)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">Module Permissions:</p>
                      <div className="flex flex-wrap gap-2">
                        {Object.entries(user.permissions).map(([module, enabled]) => 
                          enabled && (
                            <Badge key={module} variant="outline" className="text-xs">
                              {module}
                            </Badge>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(user.id)}>
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {undoAction && (
        <FloatingUndo
          message={undoAction.message}
          onUndo={undoAction.action}
          onDismiss={() => setUndoAction(null)}
        />
      )}
    </ProjectLayout>
  )
}
