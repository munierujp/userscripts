import { createFilterMenuAppender } from './createFilterMenuAppender'
import {
  FilterType,
  isFilterType
} from './FilterType'
import { getDiscountedItemsShower } from './getDiscountedItemsShower'
import { isViewType } from './ViewType'

const params = new URLSearchParams(location.search)
const view = params.get('view')

if (!isViewType(view)) {
  throw new Error(`Invalid view. view=${String(view)}`)
}

const filter = params.get('filter')
const filterType = isFilterType(filter) ? filter : FilterType.ALL
const main = document.getElementById('main-bmk')

if (main === null) {
  throw new Error('Missing main element.')
}

if (filterType === FilterType.DISCOUNTED) {
  const showDiscountedItems = getDiscountedItemsShower(view)
  showDiscountedItems(main)
}

const appendFilterMenu = createFilterMenuAppender(filterType)
appendFilterMenu(main)
