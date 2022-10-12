import { createAllButton } from './createAllButton'
import { createDiscountedButton } from './createDiscountedButton'
import type { Filter } from './Filter'

export const createButtonList = (filter: Filter): HTMLUListElement => {
  const allButton = createAllButton(filter)
  const discountedButton = createDiscountedButton(filter)
  const buttonList = document.createElement('ul')
  buttonList.append(allButton)
  buttonList.append(discountedButton)
  return buttonList
}
