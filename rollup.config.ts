import { readFileSync } from 'node:fs'
import typescript from '@rollup/plugin-typescript'
import { sync as globSync } from 'glob'
import type { RollupOptions } from 'rollup'

const files = globSync('src/**/main.ts')
const config: RollupOptions[] = files.map(file => ({
  input: file,
  output: {
    file: file.replace(/^src\//, 'dist/').replace(/\/main\.ts$/, '.user.js'),
    format: 'iife',
    banner: readFileSync(file.replace(/\/main\.ts$/, '/meta.txt'), 'utf8')
  },
  plugins: [
    typescript()
  ]
}))

export default config
