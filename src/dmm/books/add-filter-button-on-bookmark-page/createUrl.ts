import type { FilterType } from './FilterType'

export const createUrl = (filterType: FilterType): URL => {
  const url = new URL(location.href)
  url.searchParams.set('filter', filterType)
  return url
}
