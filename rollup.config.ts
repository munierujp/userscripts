// https://qiita.com/munieru_jp/items/ce57ec8c839f4a8727be

import { readFileSync } from 'node:fs'
import typescript from '@rollup/plugin-typescript'
import glob from 'glob'
import type { RollupOptions } from 'rollup'
import cleanup from 'rollup-plugin-cleanup'
import watch from 'rollup-plugin-watch'
import { stringify } from 'userscript-metadata'
import type { Metadata } from 'userscript-metadata'

const readMetadata = (path: string): Metadata => JSON.parse(readFileSync(path, 'utf8'))
const rootDir = process.cwd()
const entryPaths = glob.sync('src/**/main.ts')
const configs: RollupOptions[] = entryPaths.flatMap(entryPath => {
  const manifestPath = entryPath.replace(/\/main\.ts$/, '/manifest.json')
  const mainScriptPath = entryPath.replace(/^src\//, 'dist/').replace(/\/(.+)\/main\.ts$/, '/$1.user.js')
  const mainScriptUrl = `file://${rootDir}/${mainScriptPath}`
  const devScriptPath = entryPath.replace(/^src\//, 'dist/').replace(/\/(.+)\/main\.ts$/, '/$1.dev.user.js')
  const devify = (metadata: Metadata): Metadata => {
    const requires: string[] = []

    if (typeof metadata.require === 'string') {
      requires.push(metadata.require)
    } else if (Array.isArray(metadata.require)) {
      // TODO: fix this error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      requires.push(...metadata.require)
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
