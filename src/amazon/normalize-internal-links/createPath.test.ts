import { describe, expect, it } from '@jest/globals'
import { createPath } from './createPath'

describe('createPath', () => {
  it('returns path', () => {
    const asin = 'B0064CZ1XE'

    const actual = createPath(asin)

    expect(actual).toBe('/dp/B0064CZ1XE')
  })
})
