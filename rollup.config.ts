import { readFileSync } from 'node:fs'
import typescript from '@rollup/plugin-typescript'
import { sync as glob } from 'glob'
import type { RollupOptions } from 'rollup'
import watch from 'rollup-plugin-watch'
import {
  stringify as stringifyMetadata,
  type Metadata
} from 'userscript-metadata'

const readMetadata = (path: string): Metadata => JSON.parse(readFileSync(path, 'utf8'))
const rootDir = process.cwd()
const entries = glob('src/**/main.ts').map(entryPath => {
  const manifestPath = entryPath.replace(/\/main\.ts$/, '/manifest.json')
  const mainScriptPath = entryPath.replace(/^src\//, 'dist/').replace(/\/(.+)\/main\.ts$/, '/$1.user.js')
  const devScriptPath = entryPath.replace(/^src\//, 'dist/').replace(/\/(.+)\/main\.ts$/, '/$1.dev.user.js')
  const devifyMetadata = (metadata: Metadata): Metadata => {
    const requires: string[] = []

    if (typeof metadata.require === 'string') {
      requires.push(metadata.require)
    } else if (Array.isArray(metadata.require)) {
      requires.push(...metadata.require)
    }

    requires.push(`file://${rootDir}/${mainScriptPath}`)
    return {
      ...metadata,
      name: `[dev] ${String(metadata.name)}`,
      require: requires
    }
  }
  const createMainHeader = (): string => stringifyMetadata(readMetadata(manifestPath))
  const createDevHeader = (): string => stringifyMetadata(devifyMetadata(readMetadata(manifestPath)))
  return {
    createDevHeader,
    createMainHeader,
    devScriptPath,
    entryPath,
    mainScriptPath
  }
})
const mainConfigs: RollupOptions[] = entries.map(({ createMainHeader, entryPath, mainScriptPath }) => ({
  input: entryPath,
  output: {
    file: mainScriptPath,
    format: 'iife',
    banner: () => createMainHeader()
  },
  plugins: [
    typescript(),
    watch({
      dir: 'src'
    })
  ]
}))
const devConfigs: RollupOptions[] = entries.map(({ createDevHeader, devScriptPath }) => ({
  input: 'rollup/dev.ts',
  output: {
    file: devScriptPath,
    banner: () => createDevHeader()
  },
  plugins: [
    typescript(),
    watch({
      dir: 'src'
    })
  ]
}))

export default [
  ...mainConfigs,
  ...devConfigs
]
