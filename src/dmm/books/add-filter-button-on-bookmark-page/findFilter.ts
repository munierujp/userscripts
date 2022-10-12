import {
  Filter,
  isFilter
} from './Filter'

export const findFilter = (): Filter | undefined => {
  const params = new URLSearchParams(location.search)
  const maybeFilter = params.get('filter')
  return isFilter(maybeFilter) ? maybeFilter : undefined
}
