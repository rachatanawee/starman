import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { PageTransition } from '@/core/layout/page-transition'
import { SettingsProvider } from '@/lib/settings-context'
import { ThemeLoader } from '@/core/layout/theme-loader'
import { PageTracker } from '@/core/layout/page-tracker'
import { Toaster } from '@/shared/components/ui/sonner'
import '../globals.css'

export const dynamic = 'force-dynamic'

const locales = ['en', 'th']

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

  return (
    <>
      <SettingsProvider>
        <ThemeLoader />
        <PageTracker />
        <NuqsAdapter>
          <NextIntlClientProvider messages={messages}>
            <PageTransition>
              {children}
            </PageTransition>
          </NextIntlClientProvider>
        </NuqsAdapter>
        <Toaster />
      </SettingsProvider>
    </>
  )
}
