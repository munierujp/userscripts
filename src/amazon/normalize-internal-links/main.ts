import { findLinks } from '../../lib/findLinks'
import { extractAsin } from './extractAsin'

findLinks().forEach(element => {
  const href = element.getAttribute('href')

  if (href === null || !href.startsWith('/')) {
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
