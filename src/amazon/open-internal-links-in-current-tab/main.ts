import { isInternalLink } from './isInternalLink'

Array.from(document.getElementsByTagName('a'))
  .filter(element => isInternalLink(element))
  .filter(element => element.getAttribute('target') === '_blank')
  .forEach(element => element.removeAttribute('target'))
