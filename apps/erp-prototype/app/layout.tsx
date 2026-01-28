import { AIProvider } from '@/lib/ai-context'

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
