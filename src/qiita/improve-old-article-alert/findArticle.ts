import { findJsonLds } from '../../util/findJsonLds.js'
import { isArticle } from './Article.js'
import type { Article } from './Article.js'

export const findArticle = (): Article | undefined => {
  const jsonLds = findJsonLds()
  return jsonLds
    .map(json => JSON.parse(json) as unknown)
    // eslint-disable-next-line unicorn/no-array-callback-reference
    .find(isArticle)
}
