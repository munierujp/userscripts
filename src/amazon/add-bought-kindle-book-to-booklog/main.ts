import { Origin } from './Origin'
import { processAmazon } from './processAmazon'
import { processBooklog } from './processBooklog'

switch (location.origin) {
  case Origin.Amazon:
    processAmazon()
    break
  case Origin.Booklog:
    processBooklog()
    break
}
