import type { Filter } from './Filter'

export const createUrl = (filter: Filter): URL => {
  const url = new URL(location.href)
  url.searchParams.set('filter', filter)
  return url
}
