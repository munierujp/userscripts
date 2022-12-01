import { Message } from '../Message'
import { Origin } from '../Origin'
import { findAddButtonElement } from './findAddButtonElement'

/**
 * Amazonから開かれた場合の処理を実行します。
 */
export const handleOpenedFromAmazon = (): void => {
  // Amazonから購入完了メッセージを受信したら、追加ボタンをクリック
  window.addEventListener('message', ({ data, origin }) => {
    if (origin === Origin.Amazon && data === Message.Bought) {
      const addButtonElement = findAddButtonElement()
      addButtonElement?.click()
    }
  })

  // Amazonに準備完了メッセージを送信
  opener.postMessage(Message.WindowReady, Origin.Amazon)
}
