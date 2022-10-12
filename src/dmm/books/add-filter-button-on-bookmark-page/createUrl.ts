import type { Filter } from './Filter'

export const createUrl = (filterType: Filter): URL => {
  const url = new URL(location.href)
  url.searchParams.set('filter', filterType)
  return url
}
