import { handleAmazon } from './amazon'
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
