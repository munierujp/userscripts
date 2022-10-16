import { findJsonLdElements } from '../../util'
import { isArticle } from './Article'
import type { Article } from './Article'

export const findArticle = (): Article | undefined => {
  const jsonLdElements = findJsonLdElements()
  return jsonLdElements
    .map(({ textContent }) => textContent !== null ? JSON.parse(textContent) as unknown : undefined)
    // eslint-disable-next-line unicorn/no-array-callback-reference
    .find(isArticle)
}
