import 'jsdom-global/register'
import assert from 'node:assert'
import {
  describe,
  it
} from 'node:test'
import { cloneNode } from './cloneNode'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
describe('cloneNode', () => {
  // eslint-disable-next-line @typescript-eslint/no-floating-promises
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

    assert.ok(clonedParentNode instanceof HTMLDivElement)
    assert.strictEqual(clonedParentNode.getAttribute('id'), 'parent')
    assert.ok(clonedParentNode.classList.contains('before'))
    assert.ok(!clonedParentNode.classList.contains('after'))
    assert.strictEqual(clonedParentNode.children.length, 1)
    const [clonedChildNode] = clonedParentNode.children
    assert.ok(clonedChildNode instanceof HTMLSpanElement)
    assert.strictEqual(clonedChildNode.getAttribute('id'), 'child')
    assert.ok(clonedChildNode.classList.contains('before'))
    assert.ok(!clonedChildNode.classList.contains('after'))
  })
})
