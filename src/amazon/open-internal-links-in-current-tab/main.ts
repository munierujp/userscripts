import { findInternalLinks } from '../../lib/findInternalLinks'

findInternalLinks()
  .filter(element => element.getAttribute('target') === '_blank')
  .forEach(element => element.removeAttribute('target'))
