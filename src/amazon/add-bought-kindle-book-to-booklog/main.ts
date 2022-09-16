import { handleAmazon } from './handleAmazon'
import { Origin } from './Origin'
import { processBooklog } from './processBooklog'

switch (location.origin) {
  case Origin.Amazon:
    handleAmazon()
    break
  case Origin.Booklog:
    processBooklog()
    break
}
