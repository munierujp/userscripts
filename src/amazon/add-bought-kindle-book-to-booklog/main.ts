import { Origin } from './Origin'
import { processAmazon } from './processAmazon'
import { processBooklog } from './processBooklog'

switch (location.origin) {
  case Origin.AMAZON:
    processAmazon()
    break
  case Origin.BOOKLOG:
    processBooklog()
    break
}
