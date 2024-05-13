import assert from 'node:assert'
import {
  describe,
  it
} from 'node:test'
import { extractAsin } from './extractAsin.js'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
describe('extractAsin', async () => {
  const { each } = await import('test-each')

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  describe('returns ASIN', () => {
    const inputs: Array<[path: string, expected: string | undefined]> = [
      ['/dp/B0064CZ1XE', 'B0064CZ1XE'],
      ['/foo/dp/B0064CZ1XE', 'B0064CZ1XE'],
      ['/gp/product/B0064CZ1XE', 'B0064CZ1XE'],
      ['/', undefined]
    ]
    each(inputs, ({ title }, [path, expected]) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      it(title, () => {
        const actual = extractAsin(path)
        assert.strictEqual(actual, expected)
      })
    })
  })
})
