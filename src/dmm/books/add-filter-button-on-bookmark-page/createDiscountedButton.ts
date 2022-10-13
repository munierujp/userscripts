import { ButtonLabel } from './ButtonLabel'
import { createActiveButtonElement } from './createActiveButtonElement'
import { createInactiveButton } from './createInactiveButton'
import { createUrl } from './createUrl'
import { Filter } from './Filter'

export const createDiscountedButton = (filter: Filter): HTMLLIElement => {
  switch (filter) {
    case Filter.All:
      return createInactiveButton({
        label: ButtonLabel.Discounted,
        url: createUrl(Filter.Discounted)
      })
    case Filter.Discounted:
      return createActiveButtonElement(ButtonLabel.Discounted)
  }
}
