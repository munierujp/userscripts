import { ButtonLabel } from './ButtonLabel.js'
import { createActiveButtonElement } from './createActiveButtonElement.js'
import { createInactiveButtonElement } from './createInactiveButtonElement.js'
import { createUrl } from './createUrl.js'
import { Filter } from './Filter.js'

export const createDiscountedButtonElement = (filter: Filter): HTMLLIElement => {
  switch (filter) {
    case Filter.All:
      return createInactiveButtonElement({
        label: ButtonLabel.Discounted,
        url: createUrl(Filter.Discounted)
      })
    case Filter.Discounted:
      return createActiveButtonElement(ButtonLabel.Discounted)
  }
}
