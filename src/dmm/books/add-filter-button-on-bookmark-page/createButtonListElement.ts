import { createAllButtonElement } from './createAllButtonElement'
import { createDiscountedButtonElement } from './createDiscountedButtonElement'
import { FilterType } from './FilterType'

export const createButtonListElement = (filterType: FilterType): HTMLUListElement => {
  const allButton = createAllButtonElement(filterType)
  const discountedButton = createDiscountedButtonElement(filterType)
  const buttonList = document.createElement('ul')
  buttonList.append(allButton)
  buttonList.append(discountedButton)
  return buttonList
}
