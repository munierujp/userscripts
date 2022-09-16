import { isPlayButton } from './isPlayButton'

describe('isPlayButton', () => {
  it('returns true if element is play button', () => {
    const element = document.createElement('span')
    element.classList.add('x-btn', 'play')

    const actual = isPlayButton(element)

    expect(actual).toBe(true)
  })

  it('returns false if element is not play button', () => {
    const element = document.createElement('span')

    const actual = isPlayButton(element)

    expect(actual).toBe(false)
  })
})
