import { createButtonList } from './createButtonList'
import { FilterType } from './FilterType'

export const createFilterMenu = (filterType: FilterType): HTMLDivElement => {
  const label = document.createElement('span')
  label.textContent = '絞り込み'
  const buttonList = createButtonList(filterType)
  const filterMenu = document.createElement('div')
  filterMenu.append(label)
  filterMenu.append(buttonList)
  return filterMenu
}
