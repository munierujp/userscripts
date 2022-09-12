import { EventType } from './EventType'
import { extractAsinOnAmazon } from './extractAsinOnAmazon'
import { Origin } from './Origin'

export const processAmazon = (): void => {
  const asin = extractAsinOnAmazon(new URL(location.href))

  if (asin === undefined) {
    throw new Error('ASIN is missing.')
  }

  const booklogWindow = window.open(`${Origin.BOOKLOG}/item/1/${asin}`, '_blank') ?? undefined

  if (booklogWindow === undefined) {
    throw new Error('Failed to open new window.')
  }

  window.addEventListener('message', ({ data, origin }) => {
    if (origin === Origin.BOOKLOG && data === EventType.BOOKLOG_READY) {
      booklogWindow.postMessage(EventType.AMAZON_BOUGHT, Origin.BOOKLOG)
    }
  })
}
