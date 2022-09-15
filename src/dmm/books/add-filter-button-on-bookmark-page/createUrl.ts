// TODO: リファクタリング

import { FilterType } from './FilterType'

export const createUrl = (filterType: FilterType): URL => {
  const params = new URLSearchParams(location.search)
  params.set('filter', filterType)
  const url = new URL(location.href)
  url.search = params.toString()
  return url
}
