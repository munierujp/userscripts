import { createStyleElement } from './createStyleElement'

const ID = 'jp-munieru-style-dropdown-menu'

export class DropdownMenuStyle {
  constructor (private readonly element: HTMLStyleElement) {}

  static create (): DropdownMenuStyle {
    const element = createStyleElement(ID)
    document.head.append(element)
    return new DropdownMenuStyle(element)
  }

  static find (): DropdownMenuStyle | undefined {
    const element = document.getElementById(ID)
    return element instanceof HTMLStyleElement ? new DropdownMenuStyle(element) : undefined
  }

  hideDropdownMenu (): void {
    this.element.textContent = `
.syno-ux-menu.syno-vs2-dropdown-menu {
  display: none !important;
  visibility: hidden !important;
}
`
  }

  showDropdownMenu (): void {
    this.element.textContent = ''
  }
}
