import { createFilterMenuElement } from './createFilterMenuElement'
import { FilterType } from './FilterType'
import { findMenuElement } from './findMenuElement'

export const getFilterMenuAppender = (filterType: FilterType): (main: HTMLElement) => void => {
  return (main) => {
    const menu = findMenuElement(main)

    if (menu === undefined) {
      throw new Error('Missing menu element.')
    }

    const filterMenu = createFilterMenuElement(filterType)
    menu.append(filterMenu)
  }
}
