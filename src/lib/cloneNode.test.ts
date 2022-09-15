import { cloneNode } from './cloneNode'

describe('cloneNode', () => {
  it('returns cloned node', () => {
    const element = document.createElement('a')
    element.setAttribute('id', 'test')

    const actual = cloneNode(element)

    expect(actual).toBeInstanceOf(HTMLAnchorElement)
    expect(actual.getAttribute('id')).toBe('test')
  })
})
