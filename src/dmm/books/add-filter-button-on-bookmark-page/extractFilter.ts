import { isFilter } from './Filter.js'
import type { Filter } from './Filter.js'

export const extractFilter = (url: URL): Filter | undefined => {
  const maybeFilter = url.searchParams.get('filter')
  return isFilter(maybeFilter) ? maybeFilter : undefined
}
