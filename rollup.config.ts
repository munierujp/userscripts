import { readFileSync } from 'node:fs'
import typescript from '@rollup/plugin-typescript'
import { sync as globSync } from 'glob'
import type { RollupOptions } from 'rollup'
import watch from 'rollup-plugin-watch'
import {
  stringify,
  type Metadata
} from 'userscript-metadata'

const entries = globSync('src/**/main.ts').map(entryPath => {
  const metadataPath = entryPath.replace(/\/main\.ts$/, '/manifest.json')
  const readMetadata = (): Metadata => JSON.parse(readFileSync(metadataPath, 'utf8'))
  const scriptPath = entryPath.replace(/^src\//, 'dist/').replace(/\/(.+)\/main\.ts$/, '/$1.user.js')
  const scriptUrl = `file://${process.cwd()}/${scriptPath}`
  const devScriptPath = entryPath.replace(/^src\//, 'dist/').replace(/\/(.+)\/main\.ts$/, '/$1.dev.user.js')
  return {
    devScriptPath,
    entryPath,
    readMetadata,
    scriptPath,
    scriptUrl
  }
})

const config: RollupOptions[] = entries.map(({ entryPath, readMetadata, scriptPath }) => {
  return {
    input: entryPath,
    output: {
      file: scriptPath,
      format: 'iife',
      banner: () => stringify(readMetadata())
    },
    plugins: [
      typescript(),
      watch({
        dir: 'src'
      })
    ]
  }
})

const devConfig: RollupOptions[] = entries.map(({ devScriptPath, readMetadata, scriptUrl }) => {
  const devify = (metadata: Metadata): Metadata => {
    const { require } = metadata
    const requires: string[] = []

    if (typeof require === 'string') {
      requires.push(require)
    } else if (Array.isArray(require)) {
      requires.push(...require)
    }

    requires.push(scriptUrl)
    return {
      ...metadata,
      require: requires
    }
  }
  return {
    input: 'rollup/dev.ts',
    output: {
      file: devScriptPath,
      banner: () => stringify(devify(readMetadata()))
    },
    plugins: [
      typescript(),
      watch({
        dir: 'src'
      })
    ]
  }
})

export default [
  ...config,
  ...devConfig
]
