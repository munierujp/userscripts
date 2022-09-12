const SELECTOR_DROPDOWN_MENU = '.syno-ux-menu.syno-vs2-dropdown-menu'

export const findDropdownMenuElement = (): HTMLElement | undefined => {
  return document.querySelector<HTMLElement>(SELECTOR_DROPDOWN_MENU) ?? undefined
}
