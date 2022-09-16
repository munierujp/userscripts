import { ButtonLabel } from './ButtonLabel'
import { createActiveButton } from './createActiveButton'
import { createInactiveButton } from './createInactiveButton'
import { createUrl } from './createUrl'
import { FilterType } from './FilterType'

export const createDiscountedButton = (filterType: FilterType): HTMLLIElement => {
  switch (filterType) {
    case FilterType.All:
      return createInactiveButton({
        text: ButtonLabel.Discounted,
        url: createUrl(FilterType.Discounted)
      })
    case FilterType.Discounted:
      return createActiveButton(ButtonLabel.Discounted)
  }
}
