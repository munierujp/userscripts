import { readFile } from 'node:fs/promises'
import typescript from '@rollup/plugin-typescript'
import type { RollupOptions } from 'rollup'

const createOptions = (id: string): RollupOptions => {
  return {
    input: `src/${id}/main.ts`,
    output: {
      file: `dist/${id}.user.js`,
      format: 'iife',
      banner: async () => await readFile(`src/${id}/meta.txt`, 'utf8')
    },
    plugins: [
      typescript()
    ]
  }
}

const config: RollupOptions[] = [
  createOptions('amazon/add-bought-kindle-book-to-booklog'),
  createOptions('amazon/normalize-internal-links'),
  createOptions('amazon/open-internal-links-in-current-tab'),
  createOptions('amazon/redirect-to-normalized-url'),
  createOptions('dmm/books/add-filter-button-on-bookmark-page')
]

export default config
