import {
  Filter,
  isFilter
} from './Filter'

export const extractFilter = (url: URL): Filter | undefined => {
  const maybeFilter = url.searchParams.get('filter')
  return isFilter(maybeFilter) ? maybeFilter : undefined
}
