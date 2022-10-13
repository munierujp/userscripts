import { Bookmark } from './Bookmark'
import { Filter } from './Filter'
import { findFilter } from './findFilter'

const bookmark = Bookmark.find()

if (bookmark === undefined) {
  throw new Error('Missing bookmark.')
}

const params = new URLSearchParams(location.search)
const filter = findFilter(params) ?? Filter.All

if (filter === Filter.Discounted) {
  bookmark.hideNotDiscountedItems()
}

bookmark.appendFilterMenu(filter)
bookmark.appendFilterParamToMenuLinks(filter)
