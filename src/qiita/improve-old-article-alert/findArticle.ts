import { findJsonLds } from '../../util'
import { isArticle } from './Article'
import type { Article } from './Article'

export const findArticle = (): Article | undefined => {
  const jsonLds = findJsonLds()
  return jsonLds
    .map(json => JSON.parse(json) as unknown)
    // eslint-disable-next-line unicorn/no-array-callback-reference
    .find(isArticle)
}
