import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from '@/components/toaster'
import '../globals.css'

export const dynamic = 'force-dynamic'

const locales = ['en', 'th']

// Mock settings for prototype
async function getAppSettings() {
  return {
    app_title: 'ProjectFlow',
    app_description: 'AI-Powered Project Management',
    theme_name: 'tangerine',
    user_email: ''
  } as Record<string, string>
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  if (!locales.includes(locale)) {
    notFound()
  }

  const messages = await getMessages({ locale })
  const settings = await getAppSettings()

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''

  return (
    <>
      <link rel="stylesheet" href={`${basePath}/themes/${settings.theme_name || 'tangerine'}.css`} />
      <NuqsAdapter>
        <NextIntlClientProvider messages={messages}>
          {children}
          <Toaster />
        </NextIntlClientProvider>
      </NuqsAdapter>
    </>
  )
}
