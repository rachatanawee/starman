'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useState } from 'react'
import { toast } from 'sonner'
import { Loader2, GitBranch, Sparkles, Shield } from 'lucide-react'
import { mockAuth } from '@/lib/mock-data'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

export default function LoginPage() {
  const router = useRouter()
  const t = useTranslations('auth')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    
    try {
      // Mock authentication - accepts any credentials
      const result = await mockAuth.login(email, password)
      
      // Store mock token in localStorage
      localStorage.setItem('mock_token', result.token)
      localStorage.setItem('mock_user', JSON.stringify(result.user))
      
      toast.success(t('login') + ' ' + 'successful!')
      router.push('/en/company')
    } catch {
      setError(t('loginFailed'))
      toast.error(t('loginFailed'))
      setIsLoading(false)
    }
  }

  return (
    <div className={`flex min-h-screen ${isLoading ? 'cursor-wait' : ''}`}>
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 50%, var(--primary-darker) 100%)',
        color: 'var(--primary-foreground)'
      }}>
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to top right, transparent 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)'
        }}></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20">
              <GitBranch className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold">Starman ERP</h1>
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">AI-Powered<br />Enterprise Resource Planning</h2>
          <p className="text-lg opacity-90 mb-12">
            Streamline your manufacturing operations with intelligent automation, real-time analytics, and integrated supply chain management
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg flex-shrink-0 backdrop-blur-sm border border-white/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">AI-Driven Insights</h3>
                <p className="opacity-80 text-sm">Predictive analytics for inventory, production planning, and demand forecasting</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg flex-shrink-0 backdrop-blur-sm border border-white/20">
                <GitBranch className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Integrated Operations</h3>
                <p className="opacity-80 text-sm">Seamless integration of sales, production, inventory, and accounting</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-white/10 p-3 rounded-lg flex-shrink-0 backdrop-blur-sm border border-white/20">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Real-Time Visibility</h3>
                <p className="opacity-80 text-sm">Complete visibility across your entire manufacturing operation with RFID support</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-sm opacity-70 relative z-10">
          © 2025 Starman ERP. Prototype Version.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="bg-primary p-2 rounded-lg">
              <GitBranch className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Starman ERP</h1>
          </div>

          <Card className="w-full border-0 shadow-xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-bold text-gray-900">{t('welcomeBack')}</CardTitle>
              <CardDescription className="text-base text-gray-600">
                {t('signInToAccount')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="bg-red-50 border border-primary/20 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    {t('email')}
                  </Label>
                  <Input 
                    id="email" 
                    type="email" 
                    name="email" 
                    placeholder="demo@erp.com" 
                    defaultValue="demo@erp.com"
                    required 
                    disabled={isLoading}
                    className="h-11 border-gray-300 focus:border-primary focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    {t('password')}
                  </Label>
                  <Input 
                    id="password" 
                    type="password" 
                    name="password" 
                    placeholder="demo123"
                    defaultValue="demo123"
                    required 
                    disabled={isLoading}
                    className="h-11 border-gray-300 focus:border-primary focus:ring-primary"
                  />
                </div>
                <Button type="submit" className="w-full h-11 text-base bg-primary hover:bg-primary/90" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      {t('signingIn')}
                    </>
                  ) : (
                    t('signIn')
                  )}
                </Button>
              </form>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-center text-gray-500 leading-relaxed">
                  🎨 <strong>{t('demoMode')}</strong> - {t('uiDemo')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
