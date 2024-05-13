import assert from 'node:assert'
import {
  after,
  before,
  describe,
  it
} from 'node:test'
import globalJsdom from 'global-jsdom'
import { cloneNode } from './cloneNode.js'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
describe('cloneNode', () => {
  let cleanupGlobalJsdom: ReturnType<typeof globalJsdom>

  before(() => {
    cleanupGlobalJsdom = globalJsdom()
  })

  after(() => {
    cleanupGlobalJsdom()
  })

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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const clonedChildNode = clonedParentNode.children[0]!
    assert.ok(clonedChildNode instanceof HTMLSpanElement)
    assert.strictEqual(clonedChildNode.getAttribute('id'), 'child')
    assert.ok(clonedChildNode.classList.contains('before'))
    assert.ok(!clonedChildNode.classList.contains('after'))
  })
})
