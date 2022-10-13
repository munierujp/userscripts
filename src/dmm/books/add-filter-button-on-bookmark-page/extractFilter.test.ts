import {
  describe,
  expect,
  it
} from '@jest/globals'
import { extractFilter } from './extractFilter'
import { Filter } from './Filter'

describe('extractFilter', () => {
  it('returns filter if it exists', () => {
    const expected = Filter.Discounted
    const url = new URL(`https://book.dmm.com/bookmark/?&filter=${expected}`)

    const actual = extractFilter(url)

    expect(actual).toBe(expected)
  })

  it('returns undefined if filter does not exist', () => {
    const url = new URL('https://book.dmm.com/bookmark/')

    const actual = extractFilter(url)

    expect(actual).toBeUndefined()
  })
})
