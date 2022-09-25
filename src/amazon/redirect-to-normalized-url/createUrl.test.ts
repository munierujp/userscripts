import {
  describe,
  expect,
  it
} from '@jest/globals'
import { createUrl } from './createUrl'

describe('createUrl', () => {
  it('returns URL', () => {
    const asin = 'B0064CZ1XE'

    const actual = createUrl(asin)

    expect(actual).toBe('https://www.amazon.co.jp/dp/B0064CZ1XE')
  })
})
