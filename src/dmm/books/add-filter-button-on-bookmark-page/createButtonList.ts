// TODO: リファクタリング

import { createAllButton } from './createAllButton'
import { createDiscountedButton } from './createDiscountedButton'
import { FilterType } from './FilterType'

export const createButtonList = (filterType: FilterType): HTMLUListElement => {
  const allButton = createAllButton(filterType)
  const discountedButton = createDiscountedButton(filterType)
  const buttonList = document.createElement('ul')
  buttonList.append(allButton)
  buttonList.append(discountedButton)
  return buttonList
}
