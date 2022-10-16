import {
  describe,
  expect,
  it
} from '@jest/globals'
import { isAlertTextElement } from './isAlertTextElement'

describe('isAlertTextElement', () => {
  it('returns true if value is alert text element.', () => {
    const element = document.createElement('p')
    element.textContent = 'この記事は最終更新日から1年以上が経過しています。'

    const actual = isAlertTextElement(element)

    expect(actual).toBe(true)
  })

  it('returns false if value is not alert text element.', () => {
    const element = document.createElement('p')

    const actual = isAlertTextElement(element)

    expect(actual).toBe(false)
  })
})
