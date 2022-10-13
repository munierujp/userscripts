import {
  Filter,
  isFilter
} from './Filter'

export const findFilter = (params: URLSearchParams): Filter | undefined => {
  const maybeFilter = params.get('filter')
  return isFilter(maybeFilter) ? maybeFilter : undefined
}
