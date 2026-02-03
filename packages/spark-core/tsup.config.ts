import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
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
