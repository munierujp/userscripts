import { EventType } from './EventType'
import { findAddButton } from './findAddButton'
import { Origin } from './Origin'

/**
 * ブクログ側の処理を実行します。
 */
export const handleBooklog = (): void => {
  const opener: Window | null = window.opener

  if (opener === null || document.referrer !== 'https://www.amazon.co.jp/') {
    return
  }

  opener.postMessage(EventType.BooklogReady, Origin.Amazon)
  window.addEventListener('message', ({ data, origin }) => {
    if (origin === Origin.Amazon && data === EventType.AmazonBought) {
      const addButton = findAddButton()
      addButton?.click()
    }
  })
}
