// TODO: リファクタリング
export const hideDropdownMenuElement = (style: HTMLStyleElement): void => {
  style.textContent = `
.syno-ux-menu.syno-vs2-dropdown-menu {
  display: none !important;
  visibility: hidden !important;
}
`
}
