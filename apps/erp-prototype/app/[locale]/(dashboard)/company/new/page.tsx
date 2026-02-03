'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ProjectLayout } from '@spark/core'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@spark/core'
import { } from '@spark/core' // card'
import { Button } from '@spark/core'
import { } from '@spark/core' // button'
import { Input } from '@spark/core'
import { } from '@spark/core' // input'
import { Label } from '@spark/core'
import { } from '@spark/core' // label'
import { Textarea } from '@spark/core'
import { } from '@spark/core' // textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@spark/core'
import { } from '@spark/core' // select'
import { ArrowLeft, Building2, MapPin, Phone, Mail, Users } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

export default function NewCompanyPage() {
  const router = useRouter()
  const params = useParams()
  const locale = params.locale as string

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    taxId: '',
    address: '',
    phone: '',
    email: '',
    industry: 'manufacturing',
    employees: '50',
  })

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      toast.error('Company name is required')
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newCompany = {
        id: `comp-${Date.now()}`,
        name: formData.name,
        taxId: formData.taxId,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
        industry: formData.industry,
        employees: parseInt(formData.employees),
        createdAt: new Date().toISOString(),
      }

      toast.success('Company created successfully!')
      router.push(`/${locale}/company/${newCompany.id}/dashboard`)
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
              <div className="bg-primary/50 p-2 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Create New Company</h1>
                <p className="text-gray-600 mt-1">Set up a new company in your ERP system</p>
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
                  <Building2 className="h-5 w-5 text-primary" />
                  Company Information
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
                    placeholder="e.g., ABC Manufacturing Co., Ltd."
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taxId" className="text-sm font-medium">
                    Tax ID (เลขประจำตัวผู้เสียภาษี)
                  </Label>
                  <Input
                    id="taxId"
                    placeholder="0-1234-56789-01-2"
                    value={formData.taxId}
                    onChange={(e) => handleChange('taxId', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-sm font-medium">
                    Industry
                  </Label>
                  <Select value={formData.industry} onValueChange={(v) => handleChange('industry', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="steel">Steel & Metal</SelectItem>
                      <SelectItem value="automotive">Automotive</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="food">Food & Beverage</SelectItem>
                      <SelectItem value="textile">Textile</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employees" className="text-sm font-medium">
                    Number of Employees
                  </Label>
                  <Select value={formData.employees} onValueChange={(v) => handleChange('employees', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">1-10</SelectItem>
                      <SelectItem value="50">11-50</SelectItem>
                      <SelectItem value="100">51-100</SelectItem>
                      <SelectItem value="500">101-500</SelectItem>
                      <SelectItem value="1000">500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Contact Information
                </CardTitle>
                <CardDescription>
                  Company address and contact details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm font-medium">
                    Address
                  </Label>
                  <Textarea
                    id="address"
                    placeholder="123 Business Street, Bangkok 10110"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      <Phone className="h-4 w-4 inline mr-1" />
                      Phone
                    </Label>
                    <Input
                      id="phone"
                      placeholder="02-123-4567"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      <Mail className="h-4 w-4 inline mr-1" />
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@company.com"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-3">
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
                className="bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating...' : 'Create Company'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ProjectLayout>
  )
}
