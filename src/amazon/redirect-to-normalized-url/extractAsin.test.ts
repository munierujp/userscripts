import assert from 'node:assert'
import {
  describe,
  it
} from 'node:test'
import { extractAsin } from './extractAsin'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
describe('extractAsin', async () => {
  const { each } = await import('test-each')

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  describe('returns ASIN', () => {
    const inputs: Array<[url: string, expected: string | undefined]> = [
      ['https://www.amazon.co.jp/dp/B0064CZ1XE', 'B0064CZ1XE'],
      ['https://www.amazon.co.jp/foo/dp/B0064CZ1XE', 'B0064CZ1XE'],
      ['https://www.amazon.co.jp/gp/product/B0064CZ1XE', 'B0064CZ1XE'],
      ['https://www.amazon.co.jp/', undefined]
    ]
    each(inputs, ({ title }, [url, expected]) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      it(title, () => {
        const actual = extractAsin(url)
        assert.strictEqual(actual, expected)
      })
    })
  })
})
