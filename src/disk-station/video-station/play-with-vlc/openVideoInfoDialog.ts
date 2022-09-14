import { findActionButtonElement } from './findActionButtonElement'
import { findDropdownMenuStyleElement } from './findDropdownMenuStyleElement'
import { findOperationButtonElement } from './findOperationButtonElement'
import { findVideoInfoDialogLinkElement } from './findVideoInfoDialogLinkElement'
import { hideDropdownMenuElement } from './hideDropdownMenuElement'
import { showDropdownMenuElement } from './showDropdownMenuElement'

export const openVideoInfoDialog = (): void => {
  const dropdownMenuStyle = findDropdownMenuStyleElement()

  if (dropdownMenuStyle === undefined) {
    throw new Error('Missing dropdown menu style element.')
  }

  const actionButton = findActionButtonElement()

  if (actionButton === undefined) {
    throw new Error('Missing action button element.')
  }

  actionButton.click()
  const videoInfoDialogLink = findVideoInfoDialogLinkElement()

  if (videoInfoDialogLink === undefined) {
    throw new Error('Missing video info dialog link element.')
  }

  hideDropdownMenuElement(dropdownMenuStyle)
  const operationButton = findOperationButtonElement()

  if (operationButton === undefined) {
    throw new Error('Missing operation button element.')
  }

  operationButton.click()
  videoInfoDialogLink.click()
  showDropdownMenuElement(dropdownMenuStyle)
}
