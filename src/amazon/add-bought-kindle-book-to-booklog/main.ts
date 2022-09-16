import { handleAmazon } from './handleAmazon'
import { handleBooklog } from './handleBooklog'
import { Origin } from './Origin'

switch (location.origin) {
  case Origin.Amazon:
    handleAmazon()
    break
  case Origin.Booklog:
    handleBooklog()
    break
}
