import { findCloseButtonElement } from './findCloseButtonElement'

export const closeVideoInfoDialog = (dialog: HTMLElement): void => {
  const closeButton = findCloseButtonElement(dialog)

  if (closeButton === undefined) {
    throw new Error('Missing close button element.')
  }

  closeButton.click()
}
