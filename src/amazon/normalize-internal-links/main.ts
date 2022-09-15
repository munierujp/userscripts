import { createPath } from './createPath'
import { extractAsin } from './extractAsin'

Array.from(document.querySelectorAll('a[href^="/"]')).forEach(element => {
  const href = element.getAttribute('href')

  if (href === null) {
    return
  }

  const asin = extractAsin(href)

  if (asin === undefined) {
    return
  }

  const normalizedPath = createPath(asin)

  if (normalizedPath !== href) {
    element.setAttribute('href', normalizedPath)
  }
})
