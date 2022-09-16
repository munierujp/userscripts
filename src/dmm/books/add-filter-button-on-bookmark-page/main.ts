import { Bookmark } from './Bookmark'
import {
  FilterType,
  isFilterType
} from './FilterType'

const bookmark = Bookmark.find()

if (bookmark === undefined) {
  throw new Error('Missing bookmark.')
}

const params = new URLSearchParams(location.search)
const filter = params.get('filter')
const filterType = isFilterType(filter) ? filter : FilterType.All

if (filterType === FilterType.Discounted) {
  bookmark.hideNotDiscountedItems()
}

bookmark.appendFilterMenu(filterType)
