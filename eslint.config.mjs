import { FlatCompat } from '@eslint/eslintrc'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// eslint-config-next still ships a legacy (eslintrc) shareable config, so it has
// to be bridged into flat config via FlatCompat.
const compat = new FlatCompat({ baseDirectory: __dirname })

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'build/**',
      'coverage/**',
      'node_modules/**',
    ],
  },
  // Flat config only lints **/*.js by default; widen it so .jsx components and
  // .mjs scripts are covered too.
  ...compat.extends('next/core-web-vitals').map((config) => ({
    ...config,
    files: ['**/*.js', '**/*.jsx', '**/*.mjs'],
  })),
]

export default eslintConfig
