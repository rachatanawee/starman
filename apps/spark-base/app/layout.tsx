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
    <html suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            html {
              background-color: white;
            }
            html:not([data-theme-loaded]) body {
              opacity: 0;
            }
            html[data-theme-loaded] body {
              opacity: 1;
              transition: opacity 0.15s ease-in;
            }
          `
        }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const settings = localStorage.getItem('erp_settings');
                  const theme = settings ? JSON.parse(settings).theme_name || 'tangerine' : 'tangerine';
                  document.documentElement.setAttribute('data-theme', theme);
                  
                  const basePath = '${process.env.NEXT_PUBLIC_BASE_PATH || ''}';
                  const link = document.createElement('link');
                  link.rel = 'stylesheet';
                  link.href = basePath + '/themes/' + theme + '.css';
                  link.setAttribute('data-theme-link', 'true');
                  
                  link.onload = function() {
                    document.documentElement.setAttribute('data-theme-loaded', 'true');
                  };
                  
                  link.onerror = function() {
                    document.documentElement.setAttribute('data-theme-loaded', 'true');
                  };
                  
                  document.head.appendChild(link);
                  
                  // Fallback timeout
                  setTimeout(function() {
                    document.documentElement.setAttribute('data-theme-loaded', 'true');
                  }, 100);
                } catch (e) {
                  console.error('Failed to load theme:', e);
                  document.documentElement.setAttribute('data-theme-loaded', 'true');
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
