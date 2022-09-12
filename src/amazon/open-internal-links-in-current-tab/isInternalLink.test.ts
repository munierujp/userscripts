import { isInternalLink } from './isInternalLink'

describe('isInternalLink', () => {
  it('returns true if `href` attribute starts with `/`', () => {
    const element = document.createElement('a')
    element.href = '/foo'

    const actual = isInternalLink(element)

    expect(actual).toBe(true)
  })

  it('returns false if `href` attribute does not start with `/`', () => {
    const element = document.createElement('a')
    element.href = 'https://example.com'

    const actual = isInternalLink(element)

    expect(actual).toBe(false)
  })

  it('returns false if `href` attribute does not exist', () => {
    const element = document.createElement('a')

    const actual = isInternalLink(element)

    expect(actual).toBe(false)
  })
})
