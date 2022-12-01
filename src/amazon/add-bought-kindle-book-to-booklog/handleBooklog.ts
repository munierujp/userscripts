import { findAddButtonElement } from './findAddButtonElement'
import { Message } from './Message'
import { Origin } from './Origin'

/**
 * ブクログの処理を実行します。
 */
export const handleBooklog = (): void => {
  const opener: Window | null = window.opener

  if (opener === null || document.referrer !== 'https://www.amazon.co.jp/') {
    return
  }

  opener.postMessage(Message.WindowReady, Origin.Amazon)
  window.addEventListener('message', ({ data, origin }) => {
    if (origin === Origin.Amazon && data === Message.AmazonBought) {
      const addButtonElement = findAddButtonElement()
      addButtonElement?.click()
    }
  })
}
