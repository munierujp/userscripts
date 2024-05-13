import assert from 'node:assert'
import {
  describe,
  it
} from 'node:test'
import { extractFilter } from './extractFilter.js'
import { Filter } from './Filter.js'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
describe('extractFilter', async () => {
  const { each } = await import('test-each')

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  describe('returns filter', () => {
    const inputs: Array<[url: string, expected: Filter | undefined]> = [
      ['https://book.dmm.com/bookmark/?&filter=discounted', Filter.Discounted],
      ['https://book.dmm.com/bookmark/', undefined]
    ]
    each(inputs, ({ title }, [url, expected]) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      it(title, () => {
        const actual = extractFilter(new URL(url))
        assert.strictEqual(actual, expected)
      })
    })
  })
})
