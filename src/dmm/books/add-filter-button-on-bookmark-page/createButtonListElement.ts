import { createAllButton } from './createAllButton'
import { createDiscountedButtonElement } from './createDiscountedButtonElement'
import { FilterType } from './FilterType'

export const createButtonListElement = (filterType: FilterType): HTMLUListElement => {
  const allButton = createAllButton(filterType)
  const discountedButton = createDiscountedButtonElement(filterType)
  const buttonList = document.createElement('ul')
  buttonList.append(allButton)
  buttonList.append(discountedButton)
  return buttonList
}
