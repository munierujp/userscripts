import {
  describe,
  expect,
  it
} from '@jest/globals'
import { isArticle } from './Article'

describe('isArticle', () => {
  describe('returns whether value is Article.', () => {
    it.each([
      [
        {
          '@type': 'Article'
        },
        true
      ],
      [
        {
          '@type': 'Article',
          dateModified: '2020-05-08T16:46:28.000+09:00'
        },
        true
      ],
      [
        {},
        false
      ]
    ])('value=%p', (value, expected) => {
      const actual = isArticle(value)

      expect(actual).toBe(expected)
    })
  })
})
