import { findCloseButtonElement } from './findCloseButtonElement'

export const closeVideoInfoDialog = (dialog: HTMLElement): void => {
  const closeButton = findCloseButtonElement(dialog)
  closeButton?.click()
}
