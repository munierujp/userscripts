import { EventType } from './EventType'
import { Origin } from './Origin'

export const processBooklog = (): void => {
  window.opener.postMessage(EventType.BOOKLOG_READY, Origin.AMAZON)
  window.addEventListener('message', ({ data, origin }) => {
    if (origin === Origin.AMAZON && data === EventType.AMAZON_BOUGHT) {
      const addButton = document.querySelector<HTMLAnchorElement>('a.additem_button[data-status="4"]') ?? undefined
      addButton?.click()
    }
  })
}
