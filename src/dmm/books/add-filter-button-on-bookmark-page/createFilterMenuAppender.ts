import { createFilterMenuElement } from './createFilterMenuElement'
import { FilterType } from './FilterType'
import { findMenu } from './findMenu'

export const createFilterMenuAppender = (filterType: FilterType): (main: Element) => void => {
  return (main) => {
    const menu = findMenu(main)

    if (menu === undefined) {
      throw new Error('Missing menu.')
    }

    const filterMenu = createFilterMenuElement(filterType)
    menu.append(filterMenu)
  }
}
