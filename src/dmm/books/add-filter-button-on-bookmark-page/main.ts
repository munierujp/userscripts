import { Bookmark } from './Bookmark'
import {
  Filter,
  isFilter
} from './Filter'

const bookmark = Bookmark.find()

if (bookmark === undefined) {
  throw new Error('Missing bookmark.')
}

const params = new URLSearchParams(location.search)
const maybeFilter = params.get('filter')
const filter = isFilter(maybeFilter) ? maybeFilter : Filter.All

if (filter === Filter.Discounted) {
  bookmark.hideNotDiscountedItems()
}

bookmark.appendFilterMenu(filter)
bookmark.appendFilterParamToMenuLinks(filter)
