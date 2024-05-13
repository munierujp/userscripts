import { createAllButtonElement } from './createAllButtonElement.js'
import { createDiscountedButtonElement } from './createDiscountedButtonElement.js'
import type { Filter } from './Filter.js'

export const createButtonListElement = (filter: Filter): HTMLUListElement => {
  const allButtonElement = createAllButtonElement(filter)
  const discountedButtonElement = createDiscountedButtonElement(filter)
  const buttonList = document.createElement('ul')
  buttonList.append(allButtonElement)
  buttonList.append(discountedButtonElement)
  return buttonList
}
