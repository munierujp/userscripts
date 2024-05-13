import { findInternalLinkElements } from './findInternalLinkElements.js'

const internalLinkElements = findInternalLinkElements()
internalLinkElements.forEach(element => {
  element.removeAttribute('target')
})
