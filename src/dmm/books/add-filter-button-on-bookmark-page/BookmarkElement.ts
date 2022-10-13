import { createFilterMenuElement } from './createFilterMenuElement'
import type { Filter } from './Filter'

export class BookmarkElement {
  constructor (private readonly element: Element) {}

  static find (): BookmarkElement | undefined {
    const element = document.getElementById('main-bmk')
    return element !== null ? new BookmarkElement(element) : undefined
  }

  hideUndiscountedItems (): void {
    const list = this.element.querySelector('#list')

    if (list === null) {
      throw new Error('Missing list element.')
    }

    Array.from(list.querySelectorAll('li')).forEach(item => {
      const discount = item.querySelector('.txtoff')
      const display = discount !== null ? 'list-item' : 'none'
      item.style.display = display
    })
  }

  appendFilterMenu (filter: Filter): void {
    const menu = this.element.querySelector('.d-rcol.selector')

    if (menu === null) {
      throw new Error('Missing menu element.')
    }

    const filterMenuElement = createFilterMenuElement(filter)
    menu.append(filterMenuElement)
  }

  appendFilterParamToMenuLinks (filter: Filter): void {
    const links = this.element.querySelectorAll<HTMLAnchorElement>('.d-rcol.selector a')
    links.forEach(link => {
      const href = link.getAttribute('href')

      if (href === null) {
        return
      }

      if (!/^\?/.test(href)) {
        return
      }

      const params = new URLSearchParams(href)
      params.set('filter', filter)
      link.setAttribute('href', `?${params.toString()}`)
    })
  }
}
