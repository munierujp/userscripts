import { EventType } from './EventType'
import { findAddButton } from './findAddButton'
import { Origin } from './Origin'

export const processBooklog = (): void => {
  window.opener.postMessage(EventType.BooklogReady, Origin.Amazon)
  window.addEventListener('message', ({ data, origin }) => {
    if (origin === Origin.Amazon && data === EventType.AmazonBought) {
      const addButton = findAddButton()
      addButton?.click()
    }
  })
}
