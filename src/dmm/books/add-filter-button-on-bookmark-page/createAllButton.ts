import { ButtonLabel } from './ButtonLabel'
import { createActiveButton } from './createActiveButton'
import { createInactiveButton } from './createInactiveButton'
import { createUrl } from './createUrl'
import { FilterType } from './FilterType'

export const createAllButton = (filterType: FilterType): HTMLLIElement => {
  switch (filterType) {
    case FilterType.All:
      return createActiveButton(ButtonLabel.All)
    case FilterType.Discounted:
      return createInactiveButton({
        text: ButtonLabel.All,
        url: createUrl(FilterType.All)
      })
  }
}
