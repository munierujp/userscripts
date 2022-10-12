import { ButtonLabel } from './ButtonLabel'
import { createActiveButton } from './createActiveButton'
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
      return createActiveButton(ButtonLabel.Discounted)
  }
}
