import { findInternalLinkElements } from './findInternalLinkElements'

const internalLinkElements = findInternalLinkElements()
internalLinkElements.forEach(element => {
  element.removeAttribute('target')
})
