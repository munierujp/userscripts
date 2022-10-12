import { extractAsin } from './extractAsin'
import { findInternalLinkElements } from './findInternalLinkElements'

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
