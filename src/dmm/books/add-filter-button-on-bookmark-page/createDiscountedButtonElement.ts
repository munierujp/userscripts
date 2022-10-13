import { ButtonLabel } from './ButtonLabel'
import { createActiveButtonElement } from './createActiveButtonElement'
import { createInactiveButtonElement } from './createInactiveButtonElement'
import { createUrl } from './createUrl'
import { Filter } from './Filter'

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
