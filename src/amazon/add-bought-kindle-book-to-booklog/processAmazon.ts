import { EventType } from './EventType'
import { extractAsin } from './extractAsin'
import { Origin } from './Origin'

export const processAmazon = (): void => {
  const asin = extractAsin(new URL(location.href))

  if (asin === undefined) {
    throw new Error('ASIN is missing.')
  }

  const booklogTab = window.open(`${Origin.BOOKLOG}/item/1/${asin}`, '_blank')

  if (booklogTab === null) {
    throw new Error('Failed to open new tab.')
  }

  window.addEventListener('message', ({ data, origin }) => {
    if (origin === Origin.BOOKLOG && data === EventType.BOOKLOG_READY) {
      booklogTab.postMessage(EventType.AMAZON_BOUGHT, Origin.BOOKLOG)
    }
  })
}
