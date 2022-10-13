import { extractAsin } from './extractAsin'
import { Message } from './Message'
import { Origin } from './Origin'

/**
 * Amazonの処理を実行します。
 */
export const handleAmazon = (): void => {
  const asin = extractAsin(new URL(location.href))

  if (asin === undefined) {
    throw new Error('ASIN is missing.')
  }

  const booklogTab = window.open(`${Origin.Booklog}/item/1/${asin}`, '_blank')

  if (booklogTab === null) {
    throw new Error('Failed to open new tab.')
  }

  window.addEventListener('message', ({ data, origin }) => {
    if (origin === Origin.Booklog && data === Message.BooklogReady) {
      booklogTab.postMessage(Message.AmazonBought, Origin.Booklog)
    }
  })
}
