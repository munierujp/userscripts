import {
  describe,
  expect,
  it
} from '@jest/globals'
import { isPlayButtonElement } from './isPlayButtonElement'

describe('isPlayButtonElement', () => {
  it('returns true if element is play button', () => {
    const element = document.createElement('span')
    element.classList.add('x-btn', 'play')

    const actual = isPlayButtonElement(element)

    expect(actual).toBe(true)
  })

  it('returns false if element is not play button', () => {
    const element = document.createElement('span')

    const actual = isPlayButtonElement(element)

    expect(actual).toBe(false)
  })
})
