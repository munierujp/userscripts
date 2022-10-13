import {
  Filter,
  isFilter
} from './Filter'

export const extractFilter = (params: URLSearchParams): Filter | undefined => {
  const maybeFilter = params.get('filter')
  return isFilter(maybeFilter) ? maybeFilter : undefined
}
