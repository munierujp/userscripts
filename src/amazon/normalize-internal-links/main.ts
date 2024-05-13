import { extractAsin } from './extractAsin.js'
import { findInternalLinkElements } from './findInternalLinkElements.js'

const internalLinkElements = findInternalLinkElements()
internalLinkElements.forEach(element => {
  const href = element.getAttribute('href')

  if (href === null) {
    return
  }

  const asin = extractAsin(href)

  if (asin === undefined) {
    return
  }

  const normalizedPath = `/dp/${asin}`

  if (normalizedPath !== href) {
    element.setAttribute('href', normalizedPath)
  }
})
