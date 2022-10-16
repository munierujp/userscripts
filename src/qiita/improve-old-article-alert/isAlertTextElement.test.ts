import {
  describe,
  expect,
  it
} from '@jest/globals'
import { isAlertTextElement } from './isAlertTextElement'

describe('isAlertTextElement', () => {
  describe('returns whether value is alert text element.', () => {
    it.each([
      [
        'この記事は最終更新日から1年以上が経過しています。',
        true
      ],
      [
        'この記事は最終更新日から10年以上が経過しています。',
        true
      ],
      [
        'この記事は1年以内に更新されています。',
        false
      ]
    ])('message=%p', (message, expected) => {
      const element = document.createElement('p')
      element.textContent = message

      const actual = isAlertTextElement(element)

      expect(actual).toBe(expected)
    })
  })
})
