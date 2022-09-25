import {
  describe,
  expect,
  it
} from '@jest/globals'
import { extractAsin } from './extractAsin'

describe('extractAsin', () => {
  it.each([
    ['/dp/B0064CZ1XE', 'B0064CZ1XE'],
    ['/foo/dp/B0064CZ1XE', 'B0064CZ1XE'],
    ['/gp/product/B0064CZ1XE', 'B0064CZ1XE']
  ])('returns ASIN if it exists', (path, expected) => {
    const actual = extractAsin(path)

    expect(actual).toBe(expected)
  })

  it('returns undefined if ASIN does not exist', () => {
    const path = '/'

    const actual = extractAsin(path)

    expect(actual).toBeUndefined()
  })
})
