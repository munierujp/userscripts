import { createFilterMenuAppender } from './createFilterMenuAppender'
import {
  FilterType,
  isFilterType
} from './FilterType'
import { getDiscountedItemsShower } from './getDiscountedItemsShower'
import { isViewType } from './ViewType'

const params = new URLSearchParams(location.search)
const view = params.get('view') ?? undefined

if (!isViewType(view)) {
  throw new Error(`Invalid view. view=${view ?? 'undefined'}`)
}

const filter = params.get('filter')
const filterType = isFilterType(filter) ? filter : FilterType.ALL
const main = document.getElementById('main-bmk') ?? undefined

if (main === undefined) {
  throw new Error('Missing main element.')
}

if (filterType === FilterType.DISCOUNTED) {
  const showDiscountedItems = getDiscountedItemsShower(view)
  showDiscountedItems(main)
}

const appendFilterMenu = createFilterMenuAppender(filterType)
appendFilterMenu(main)
