import { defineConfig } from 'tsup'
import path from 'path'

export default defineConfig({
  entry: ['index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  esbuildOptions(options) {
    options.alias = {
      '@': path.resolve(__dirname, '.')
    }
  },
  external: [
    'react',
    'react-dom',
    'next',
    '@radix-ui/*',
    '@tanstack/*',
    'lucide-react',
    'next-intl',
    'date-fns',
    'date-fns-tz',
    'cmdk',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
    '@dnd-kit/*',
    'sonner',
    'react-day-picker'
  ]
})
