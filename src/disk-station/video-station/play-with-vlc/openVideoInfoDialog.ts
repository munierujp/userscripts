import { findDropdownMenuElement } from './findDropdownMenuElement'
import { findDropdownMenuStyleElement } from './findDropdownMenuStyleElement'
import { findVideoInfoDialogLinkElement } from './findVideoInfoDialogLinkElement'
import { hideDropdownMenuElement } from './hideDropdownMenuElement'
import { openDropdownMenuElement } from './openDropdownMenuElement'
import { showDropdownMenuElement } from './showDropdownMenuElement'

export const openVideoInfoDialog = (): void => {
  const menuStyle = findDropdownMenuStyleElement()

  if (menuStyle === undefined) {
    throw new Error('Missing menu style element.')
  }

  const menu = findDropdownMenuElement()

  if (menu === undefined) {
    throw new Error('Missing menu element.')
  }

  const link = findVideoInfoDialogLinkElement(menu)

  if (link === undefined) {
    throw new Error('Missing video info dialog link element.')
  }

  hideDropdownMenuElement(menuStyle)
  openDropdownMenuElement()
  link.click()
  showDropdownMenuElement(menuStyle)
}
