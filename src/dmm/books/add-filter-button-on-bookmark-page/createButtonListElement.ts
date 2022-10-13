import { createAllButtonElement } from './createAllButtonElement'
import { createDiscountedButtonElement } from './createDiscountedButtonElement'
import type { Filter } from './Filter'

export const createButtonListElement = (filter: Filter): HTMLUListElement => {
  const allButtonElement = createAllButtonElement(filter)
  const discountedButtonElement = createDiscountedButtonElement(filter)
  const buttonList = document.createElement('ul')
  buttonList.append(allButtonElement)
  buttonList.append(discountedButtonElement)
  return buttonList
}
