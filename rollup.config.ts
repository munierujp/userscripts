// https://qiita.com/munieru_jp/items/ce57ec8c839f4a8727be

import { readFileSync } from 'node:fs'
import typescriptModule from '@rollup/plugin-typescript'
import { globSync } from 'glob'
import type { RollupOptions } from 'rollup'
import cleanup from 'rollup-plugin-cleanup'
import watchModule from 'rollup-plugin-watch'
import { stringify } from 'userscript-metadata'
import type {
  Metadata,
  SingleValue
} from 'userscript-metadata'

// NOTE: workaround until this PR is merged: https://github.com/rollup/plugins/pull/1578
const typescript = (typescriptModule as unknown as typeof typescriptModule['default'])
const watch = (watchModule as unknown as typeof watchModule['default'])

const readMetadata = (path: string): Metadata => JSON.parse(readFileSync(path, 'utf8'))
const rootDir = process.cwd()
const entryPaths = globSync('src/**/main.ts')
const configs: RollupOptions[] = entryPaths.flatMap(entryPath => {
  const manifestPath = entryPath.replace(/\/main\.ts$/, '/manifest.json')
  const mainScriptPath = entryPath.replace(/^src\//, 'dist/').replace(/\/(.+)\/main\.ts$/, '/$1.user.js')
  const mainScriptUrl = `file://${rootDir}/${mainScriptPath}`
  const devScriptPath = entryPath.replace(/^src\//, 'dist/').replace(/\/(.+)\/main\.ts$/, '/$1.dev.user.js')
  const devify = (metadata: Metadata): Metadata => {
    const requires: SingleValue[] = []

    if (typeof metadata.require === 'string') {
      requires.push(metadata.require)
    } else if (Array.isArray(metadata.require)) {
      requires.push(...metadata.require as SingleValue[])
    }

    requires.push(mainScriptUrl)
    return {
      ...metadata,
      name: `[dev] ${String(metadata.name)}`,
      require: requires
    }
  }
  const mainConfig: RollupOptions = {
    input: entryPath,
    output: {
      file: mainScriptPath,
      format: 'iife',
      banner: () => `${stringify(readMetadata(manifestPath))}\n`
    },
    plugins: [
      typescript(),
      cleanup({
        extensions: [
          'ts'
        ]
      }),
      watch({
        dir: 'src'
      })
    ]
  }
  const devConfig: RollupOptions = {
    input: 'src/dev.ts',
    output: {
      file: devScriptPath,
      banner: () => `${stringify(devify(readMetadata(manifestPath)))}\n`
    },
    plugins: [
      typescript(),
      cleanup({
        extensions: [
          'ts'
        ]
      }),
      watch({
        dir: 'src'
      })
    ]
  }
  return [
    mainConfig,
    devConfig
  ]
})

export default configs
