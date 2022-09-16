// TODO: リファクタリング

import { createFilterMenuAppender } from './createFilterMenuAppender'
import {
  FilterType,
  isFilterType
} from './FilterType'
import { findMain } from './findMain'
import { getDiscountedItemsShower } from './getDiscountedItemsShower'
import { isViewType } from './ViewType'

const params = new URLSearchParams(location.search)
const view = params.get('view')

if (!isViewType(view)) {
  throw new Error('Invalid view.')
}

const main = findMain()

if (main === undefined) {
  throw new Error('Missing main.')
}

const filter = params.get('filter')
const filterType = isFilterType(filter) ? filter : FilterType.All

if (filterType === FilterType.Discounted) {
  const showDiscountedItems = getDiscountedItemsShower(view)
  showDiscountedItems(main)
}

const appendFilterMenu = createFilterMenuAppender(filterType)
appendFilterMenu(main)
