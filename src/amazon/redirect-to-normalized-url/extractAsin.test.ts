import { describe, expect, it } from '@jest/globals'
import { extractAsin } from './extractAsin'

describe('extractAsin', () => {
  it.each([
    ['https://www.amazon.co.jp/dp/B0064CZ1XE', 'B0064CZ1XE'],
    ['https://www.amazon.co.jp/foo/dp/B0064CZ1XE', 'B0064CZ1XE'],
    ['https://www.amazon.co.jp/gp/product/B0064CZ1XE', 'B0064CZ1XE']
  ])('returns ASIN if it exists', (url, expected) => {
    const actual = extractAsin(url)

    expect(actual).toBe(expected)
  })

  it('returns undefined if ASIN does not exist', () => {
    const url = 'https://www.amazon.co.jp/'

    const actual = extractAsin(url)

    expect(actual).toBeUndefined()
  })
})
