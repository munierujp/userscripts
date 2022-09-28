import { createFilterMenu } from './createFilterMenu'
import type { FilterType } from './FilterType'

export class Bookmark {
  constructor (private readonly element: Element) {}

  static find (): Bookmark | undefined {
    const element = document.getElementById('main-bmk')
    return element !== null ? new Bookmark(element) : undefined
  }

  hideNotDiscountedItems (): void {
    const list = this.element.querySelector('#list')

    if (list === null) {
      throw new Error('Missing list.')
    }

    Array.from(list.querySelectorAll('li')).forEach(item => {
      const discount = item.querySelector('.txtoff')
      const display = discount !== null ? 'list-item' : 'none'
      item.style.display = display
    })
  }

  appendFilterMenu (filterType: FilterType): void {
    const menu = this.element.querySelector('.d-rcol.selector')

    if (menu === null) {
      throw new Error('Missing menu.')
    }

    const filterMenu = createFilterMenu(filterType)
    menu.append(filterMenu)
  }

  appendFilterParamToMenuLinks (filterType: FilterType): void {
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
      params.set('filter', filterType)
      link.setAttribute('href', `?${params.toString()}`)
    })
  }
}
