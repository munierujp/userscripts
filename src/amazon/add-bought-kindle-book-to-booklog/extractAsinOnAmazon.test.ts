import { extractAsinOnAmazon } from "./extractAsinOnAmazon"

describe('extractAsinOnAmazon', () => {
  it('returns ASIN', () => {
    const expected = 'B0064CZ1XE'
    const url = new URL(`https://www.amazon.co.jp/kindle-dbs/thankYouPage?&asin=${expected}`)

    const actual = extractAsinOnAmazon(url)

    expect(actual).toBe(expected)
  })
})
