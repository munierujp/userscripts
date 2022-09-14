import { ID } from './ID'

export const findDropdownMenuStyleElement = (): HTMLStyleElement | undefined => {
  const element = document.getElementById(ID.DROPDOWN_MENU_STYLE)
  return element instanceof HTMLStyleElement ? element : undefined
}
