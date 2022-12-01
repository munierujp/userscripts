import { findAddButtonElement } from './findAddButtonElement'
import { isOpenedFromAmazon } from './isOpenedFromAmazon'
import { Message } from './Message'
import { Origin } from './Origin'

/**
 * ブクログの処理を実行します。
 */
export const handleBooklog = (): void => {
  const opener: Window | null = window.opener

  if (opener === null || !isOpenedFromAmazon()) {
    return
  }

  opener.postMessage(Message.WindowReady, Origin.Amazon)
  window.addEventListener('message', ({ data, origin }) => {
    if (origin === Origin.Amazon && data === Message.Bought) {
      const addButtonElement = findAddButtonElement()
      addButtonElement?.click()
    }
  })
}
