import { createAllButton } from './createAllButton'
import { createDiscountedButton } from './createDiscountedButton'
import type { Filter } from './Filter'

export const createButtonList = (filterType: Filter): HTMLUListElement => {
  const allButton = createAllButton(filterType)
  const discountedButton = createDiscountedButton(filterType)
  const buttonList = document.createElement('ul')
  buttonList.append(allButton)
  buttonList.append(discountedButton)
  return buttonList
}
