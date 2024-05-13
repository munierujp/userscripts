import { handleAmazon } from './amazon/handleAmazon.js'
import { handleBooklog } from './booklog/handleBooklog.js'
import { Origin } from './Origin.js'

switch (location.origin) {
  case Origin.Amazon:
    handleAmazon()
    break
  case Origin.Booklog:
    handleBooklog()
    break
}
