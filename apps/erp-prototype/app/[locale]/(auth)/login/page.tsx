'use client'

import { Button } from '@spark/core'
import { } from '@spark/core' // button'
import { Input } from '@spark/core'
import { } from '@spark/core' // input'
import { Label } from '@spark/core'
import { } from '@spark/core' // label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@spark/core'
import { } from '@spark/core' // card'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Loader2, Sparkles, Shield, GitBranch } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import { mockAuth } from '@/lib/mock-data'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useSettings } from '@spark/core'
import { DynamicTitle } from '@spark/core'

export default function LoginPage() {
  const router = useRouter()
  const t = useTranslations('auth')
  const settings = useSettings()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFadingOut, setIsFadingOut] = useState(false)
  
  const appName = settings.app_name || 'Starman ERP'
  const appIcon = settings.app_icon || 'GitBranch'
  const AppIcon = (LucideIcons as any)[appIcon] || (LucideIcons as any).GitBranch

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
      
      // Fade out before redirect
      setIsFadingOut(true)
      await new Promise(resolve => setTimeout(resolve, 300))
      
      // Redirect to last page or company list
      const lastPage = localStorage.getItem('last_page')
      if (lastPage && lastPage !== '/en/login' && lastPage !== '/th/login') {
        router.push(lastPage)
      } else {
        router.push('/en/company')
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t('loginFailed')
      setError(errorMessage)
      toast.error(errorMessage)
      setIsLoading(false)
    }
  }

  return (
    <>
      <DynamicTitle pageTitle="Login" />
      <div className={`flex min-h-screen transition-opacity duration-300 ${isFadingOut ? 'opacity-0' : 'opacity-100'} ${isLoading ? 'cursor-wait' : ''}`}>
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-between relative overflow-hidden" style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 50%, var(--primary-darker) 100%)',
        color: 'var(--primary-foreground)'
      }}>
        {/* Animated floating shapes */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float-continuous" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-40 right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-float-continuous" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-white/5 rounded-full blur-2xl animate-float-continuous" style={{ animationDelay: '4s' }}></div>
          <div className="absolute top-1/2 right-10 w-28 h-28 bg-white/5 rounded-full blur-2xl animate-float-continuous" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 right-1/3 w-32 h-32 bg-white/5 rounded-full blur-2xl animate-float-continuous" style={{ animationDelay: '3s' }}></div>
        </div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 pointer-events-none animate-gradient-shift" style={{
          background: 'linear-gradient(to top right, transparent 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)'
        }}></div>
        
        <div className="relative z-10 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white/10 p-2 rounded-lg backdrop-blur-sm border border-white/20 animate-pulse-glow">
              <AppIcon className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold">{appName}</h1>
          </div>
          <h2 className="text-4xl font-bold mb-4 leading-tight">AI-Powered<br />Enterprise Resource Planning</h2>
          <p className="text-lg opacity-90 mb-12">
            Streamline your manufacturing operations with intelligent automation, real-time analytics, and integrated supply chain management
          </p>
          <div className="space-y-6">
            <div className="flex items-start gap-4 animate-fade-in-up hover:translate-x-2 transition-transform duration-300" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white/10 p-3 rounded-lg flex-shrink-0 backdrop-blur-sm border border-white/20 animate-pulse-glow" style={{ animationDelay: '0.5s' }}>
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">AI-Driven Insights</h3>
                <p className="opacity-80 text-sm">Predictive analytics for inventory, production planning, and demand forecasting</p>
              </div>
            </div>
            <div className="flex items-start gap-4 animate-fade-in-up hover:translate-x-2 transition-transform duration-300" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white/10 p-3 rounded-lg flex-shrink-0 backdrop-blur-sm border border-white/20 animate-pulse-glow" style={{ animationDelay: '1s' }}>
                <GitBranch className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Integrated Operations</h3>
                <p className="opacity-80 text-sm">Seamless integration of sales, production, inventory, and accounting</p>
              </div>
            </div>
            <div className="flex items-start gap-4 animate-fade-in-up hover:translate-x-2 transition-transform duration-300" style={{ animationDelay: '0.3s' }}>
              <div className="bg-white/10 p-3 rounded-lg flex-shrink-0 backdrop-blur-sm border border-white/20 animate-pulse-glow" style={{ animationDelay: '1.5s' }}>
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
          © 2025 {appName}. Prototype Version.
          <div 
            className="mt-1 text-xs opacity-60 cursor-help transition-opacity hover:opacity-100"
            title={process.env.NEXT_PUBLIC_BUILD_TIME ? `Built on ${new Date(process.env.NEXT_PUBLIC_BUILD_TIME).toLocaleString()}` : 'Build time not available'}
          >
            Build {process.env.NEXT_PUBLIC_APP_VERSION || '0.1.0'}
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="bg-primary p-2 rounded-lg">
              <AppIcon className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{appName}</h1>
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
    </>
  )
}
