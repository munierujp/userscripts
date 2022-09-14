import { createFilterMenuElement } from './createFilterMenuElement'
import { FilterType } from './FilterType'
import { findMenuElement } from './findMenuElement'

export const createFilterMenuAppender = (filterType: FilterType): (main: Element) => void => {
  return (main) => {
    const menu = findMenuElement(main)

    if (menu === undefined) {
      throw new Error('Missing menu element.')
    }

    const filterMenu = createFilterMenuElement(filterType)
    menu.append(filterMenu)
  }
}
