import { createActiveButton } from './createActiveButton'
import { createInactiveButton } from './createInactiveButton'
import { createUrl } from './createUrl'
import { FilterType } from './FilterType'

const TEXT = 'セール中'

export const createDiscountedButton = (filterType: FilterType): HTMLLIElement => {
  switch (filterType) {
    case FilterType.All:
      return createInactiveButton({
        text: TEXT,
        url: createUrl(FilterType.Discounted)
      })
    case FilterType.Discounted:
      return createActiveButton(TEXT)
  }
}
