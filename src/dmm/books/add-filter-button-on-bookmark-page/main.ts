import { Bookmark } from './Bookmark'
import { extractFilter } from './extractFilter'
import { Filter } from './Filter'

const bookmark = Bookmark.find()

if (bookmark === undefined) {
  throw new Error('Missing bookmark.')
}

const params = new URLSearchParams(location.search)
const filter = extractFilter(params) ?? Filter.All

if (filter === Filter.Discounted) {
  bookmark.hideNotDiscountedItems()
}

bookmark.appendFilterMenu(filter)
bookmark.appendFilterParamToMenuLinks(filter)
