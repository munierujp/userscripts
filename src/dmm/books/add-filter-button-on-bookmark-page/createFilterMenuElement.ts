import { createButtonListElement } from './createButtonListElement'
import { FilterType } from './FilterType'

export const createFilterMenuElement = (filterType: FilterType): HTMLElement => {
  const label = document.createElement('span')
  label.textContent = '絞り込み'
  const buttonList = createButtonListElement(filterType)
  const filterMenu = document.createElement('div')
  filterMenu.append(label)
  filterMenu.append(buttonList)
  return filterMenu
}
