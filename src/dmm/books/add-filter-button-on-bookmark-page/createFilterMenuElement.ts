import { createButtonListElement } from './createButtonListElement.js'
import type { Filter } from './Filter.js'

export const createFilterMenuElement = (filter: Filter): HTMLDivElement => {
  const label = document.createElement('span')
  label.textContent = '絞り込み'
  const buttonListElement = createButtonListElement(filter)
  const filterMenu = document.createElement('div')
  filterMenu.append(label)
  filterMenu.append(buttonListElement)
  return filterMenu
}
