import { createAllButtonElement } from './createAllButtonElement'
import { createDiscountedButton } from './createDiscountedButton'
import type { Filter } from './Filter'

export const createButtonListElement = (filter: Filter): HTMLUListElement => {
  const allButtonElement = createAllButtonElement(filter)
  const discountedButton = createDiscountedButton(filter)
  const buttonList = document.createElement('ul')
  buttonList.append(allButtonElement)
  buttonList.append(discountedButton)
  return buttonList
}
