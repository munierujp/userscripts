import { isFilter } from './Filter'
import type { Filter } from './Filter'

export const extractFilter = (url: URL): Filter | undefined => {
  const maybeFilter = url.searchParams.get('filter')
  return isFilter(maybeFilter) ? maybeFilter : undefined
}
