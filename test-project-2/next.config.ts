import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n.ts')

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  experimental: {
    proxyTimeout: 30000
  },
  serverExternalPackages: ['ldapjs', 'tls', 'net', 'dns'],
  output: 'standalone',
  devIndicators: false,

}

export default withNextIntl(nextConfig)
