import { AIProvider } from '@/lib/ai-context'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Starman ERP',
  description: 'AI-powered Enterprise Resource Planning system',
  icons: {
    icon: '/icon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        <AIProvider>
          {children}
        </AIProvider>
      </body>
    </html>
  )
}
