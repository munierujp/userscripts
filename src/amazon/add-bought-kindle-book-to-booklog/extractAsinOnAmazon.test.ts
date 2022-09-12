import { extractAsinOnAmazon } from './extractAsinOnAmazon'

describe('extractAsinOnAmazon', () => {
  it('returns ASIN if it exists', () => {
    const expected = 'B0064CZ1XE'
    const url = new URL(`https://www.amazon.co.jp/kindle-dbs/thankYouPage?&asin=${expected}`)

    const actual = extractAsinOnAmazon(url)

    expect(actual).toBe(expected)
  })

  it('returns undefined if it does not exist', () => {
    const url = new URL('https://www.amazon.co.jp/kindle-dbs/thankYouPage')

    const actual = extractAsinOnAmazon(url)

    expect(actual).toBeUndefined()
  })
})
