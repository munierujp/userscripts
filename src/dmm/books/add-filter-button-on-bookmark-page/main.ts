// TODO: リファクタリング

import { createFilterMenu } from './createFilterMenu'
import {
  FilterType,
  isFilterType
} from './FilterType'
import { findMain } from './findMain'
import { showDiscountedItems } from './showDiscountedItems'
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

const menu = main.querySelector('.d-rcol.selector')

if (menu === null) {
  throw new Error('Missing menu.')
}

const filter = params.get('filter')
const filterType = isFilterType(filter) ? filter : FilterType.All

if (filterType === FilterType.Discounted) {
  showDiscountedItems(main)
}

const filterMenu = createFilterMenu(filterType)
menu.append(filterMenu)
