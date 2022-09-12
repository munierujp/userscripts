import { extractAsin } from './extractAsin'

describe('extractAsin', () => {
  it('returns ASIN if it exists', () => {
    const expected = 'B0064CZ1XE'
    const path = `/dp/${expected}`

    const actual = extractAsin(path)

    expect(actual).toBe(expected)
  })

  it('returns undefined if ASIN does not exist', () => {
    const path = '/'

    const actual = extractAsin(path)

    expect(actual).toBeUndefined()
  })
})
