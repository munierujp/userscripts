import { BookmarkElement } from './BookmarkElement'
import { extractFilter } from './extractFilter'
import { Filter } from './Filter'

const bookmarkElement = BookmarkElement.find()

if (bookmarkElement === undefined) {
  throw new Error('Missing bookmark element.')
}

const url = new URL(location.href)
const filter = extractFilter(url) ?? Filter.All

if (filter === Filter.Discounted) {
  bookmarkElement.hideUndiscountedItems()
}

bookmarkElement.appendFilterMenu(filter)
bookmarkElement.appendFilterParamToMenuLinks(filter)
