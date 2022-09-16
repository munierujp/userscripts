import { createActiveButton } from './createActiveButton'
import { createInactiveButton } from './createInactiveButton'
import { createUrl } from './createUrl'
import { FilterType } from './FilterType'

const TEXT = 'すべて'

export const createAllButton = (filterType: FilterType): HTMLLIElement => {
  switch (filterType) {
    case FilterType.All:
      return createActiveButton(TEXT)
    case FilterType.Discounted:
      return createInactiveButton({
        text: TEXT,
        url: createUrl(FilterType.All)
      })
  }
}
