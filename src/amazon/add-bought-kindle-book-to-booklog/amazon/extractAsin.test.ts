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
    const inputs: Array<[url: string, expected: string | undefined]> = [
      ['https://www.amazon.co.jp/kindle-dbs/thankYouPage?&asin=B0064CZ1XE', 'B0064CZ1XE'],
      ['https://www.amazon.co.jp/kindle-dbs/thankYouPage?', undefined]
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
