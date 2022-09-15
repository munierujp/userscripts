import { cloneNode } from './cloneNode'

describe('cloneNode', () => {
  it('returns cloned node', () => {
    const parentNode = document.createElement('div')
    parentNode.setAttribute('id', 'parent')
    parentNode.classList.add('before')

    const childNode = document.createElement('span')
    childNode.setAttribute('id', 'child')
    childNode.classList.add('before')
    parentNode.append(childNode)

    const clonedParentNode = cloneNode(parentNode)
    parentNode.classList.remove('before')
    parentNode.classList.add('after')
    childNode.classList.remove('before')
    childNode.classList.add('after')

    expect(clonedParentNode).toBeInstanceOf(HTMLDivElement)
    expect(clonedParentNode.getAttribute('id')).toEqual('parent')
    expect(clonedParentNode.classList.contains('before')).toBe(true)
    expect(clonedParentNode.classList.contains('after')).toBe(false)
    expect(clonedParentNode.children).toHaveLength(1)
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const clonedChildNode = clonedParentNode.children[0]!
    expect(clonedChildNode).toBeInstanceOf(HTMLSpanElement)
    expect(clonedChildNode.getAttribute('id')).toEqual('child')
    expect(clonedChildNode.classList.contains('before')).toBe(true)
    expect(clonedChildNode.classList.contains('after')).toBe(false)
  })
})
