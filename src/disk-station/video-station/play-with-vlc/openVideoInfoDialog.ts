import { DropdownMenuStyle } from './DropdownMenuStyle'
import { findActionButtonElement } from './findActionButtonElement'
import { findOperationButtonElement } from './findOperationButtonElement'
import { findVideoInfoDialogLinkElement } from './findVideoInfoDialogLinkElement'

// TODO: リファクタリング
export const openVideoInfoDialog = (): void => {
  const dropdownMenuStyle = DropdownMenuStyle.find()

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

  dropdownMenuStyle.hideDropdownMenu()
  const operationButton = findOperationButtonElement()

  if (operationButton === undefined) {
    throw new Error('Missing operation button element.')
  }

  operationButton.click()
  videoInfoDialogLink.click()
  dropdownMenuStyle.showDropdownMenu()
}
