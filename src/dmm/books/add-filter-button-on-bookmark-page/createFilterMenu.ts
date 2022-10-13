import { createButtonListElement } from './createButtonListElement'
import type { Filter } from './Filter'

export const createFilterMenu = (filter: Filter): HTMLDivElement => {
  const label = document.createElement('span')
  label.textContent = '絞り込み'
  const buttonListElement = createButtonListElement(filter)
  const filterMenu = document.createElement('div')
  filterMenu.append(label)
  filterMenu.append(buttonListElement)
  return filterMenu
}
