import {
  describe,
  expect,
  it
} from '@jest/globals'
import { extractAsin } from './extractAsin'

describe('extractAsin', () => {
  it('returns ASIN if it exists', () => {
    const expected = 'B0064CZ1XE'
    const url = new URL(`https://www.amazon.co.jp/kindle-dbs/thankYouPage?&asin=${expected}`)

    const actual = extractAsin(url)

    expect(actual).toBe(expected)
  })

  it('returns undefined if ASIN does not exist', () => {
    const url = new URL('https://www.amazon.co.jp/kindle-dbs/thankYouPage?')

    const actual = extractAsin(url)

    expect(actual).toBeUndefined()
  })
})
