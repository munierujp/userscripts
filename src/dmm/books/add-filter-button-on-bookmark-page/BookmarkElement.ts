import { createFilterMenuElement } from './createFilterMenuElement'
import type { Filter } from './Filter'

export class BookmarkElement {
  constructor (private readonly element: Element) {}

  static find (): BookmarkElement | undefined {
    const element = document.getElementById('main-bmk')
    return element !== null ? new BookmarkElement(element) : undefined
  }

  hideUndiscountedItems (): void {
    const listElement = this.element.querySelector('#list')

    if (listElement === null) {
      throw new Error('Missing list element.')
    }

    const itemElements = Array.from(listElement.querySelectorAll('li'))
    itemElements.forEach(itemElement => {
      const discountElement = itemElement.querySelector('.txtoff')
      const display = discountElement !== null ? 'list-item' : 'none'
      itemElement.style.display = display
    })
  }

  appendFilterMenu (filter: Filter): void {
    const menuElement = this.element.querySelector('.d-rcol.selector')

    if (menuElement === null) {
      throw new Error('Missing menu element.')
    }

    const filterMenuElement = createFilterMenuElement(filter)
    menuElement.append(filterMenuElement)
  }

  appendFilterParamToMenuLinks (filter: Filter): void {
    const linkElements = this.element.querySelectorAll<HTMLAnchorElement>('.d-rcol.selector a')
    linkElements.forEach(linkElement => {
      const href = linkElement.getAttribute('href')

      if (href === null) {
        return
      }

      if (!/^\?/.test(href)) {
        return
      }

      const params = new URLSearchParams(href)
      params.set('filter', filter)
      linkElement.setAttribute('href', `?${params.toString()}`)
    })
  }
}
