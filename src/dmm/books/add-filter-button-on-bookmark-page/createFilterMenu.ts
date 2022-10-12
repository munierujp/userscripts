import { createButtonList } from './createButtonList'
import type { Filter } from './Filter'

export const createFilterMenu = (filter: Filter): HTMLDivElement => {
  const label = document.createElement('span')
  label.textContent = '絞り込み'
  const buttonList = createButtonList(filter)
  const filterMenu = document.createElement('div')
  filterMenu.append(label)
  filterMenu.append(buttonList)
  return filterMenu
}
