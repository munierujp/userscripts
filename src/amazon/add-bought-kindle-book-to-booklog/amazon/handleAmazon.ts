import { Message } from '../Message'
import { Origin } from '../Origin'
import { extractAsin } from './extractAsin'

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

  // ブクログから準備完了メッセージを受信したら、ブクログに購入完了メッセージを送信
  window.addEventListener('message', ({ data, origin }) => {
    if (origin === Origin.Booklog && data === Message.WindowReady) {
      booklogTab.postMessage(Message.Bought, Origin.Booklog)
    }
  })
}
