import { EventType } from './EventType'
import { findAddButton } from './findAddButton'
import { Origin } from './Origin'

export const processBooklog = (): void => {
  window.opener.postMessage(EventType.BOOKLOG_READY, Origin.AMAZON)
  window.addEventListener('message', ({ data, origin }) => {
    if (origin === Origin.AMAZON && data === EventType.AMAZON_BOUGHT) {
      const addButton = findAddButton()
      addButton?.click()
    }
  })
}
