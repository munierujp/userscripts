export const findDropdownMenuStyleElement = (): HTMLStyleElement | undefined => {
  const element = document.getElementById('jp-munieru-style-dropdown-menu')
  return element instanceof HTMLStyleElement ? element : undefined
}
