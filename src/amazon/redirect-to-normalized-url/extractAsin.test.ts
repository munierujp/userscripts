import { extractAsin } from './extractAsin'

describe('extractAsin', () => {
  it('returns ASIN if it exists', () => {
    const expected = 'B0064CZ1XE'
    const url = `https://www.amazon.co.jp/dp/${expected}`

    const actual = extractAsin(url)

    expect(actual).toBe(expected)
  })

  it('returns undefined if ASIN does not exist', () => {
    const url = 'https://www.amazon.co.jp/'

    const actual = extractAsin(url)

    expect(actual).toBeUndefined()
  })
})
