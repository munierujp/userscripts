import { createCurrentButtonElement } from './createCurrentButtonElement'
import { createNotCurrentButtonElement } from './createNotCurrentButtonElement'
import { createUrl } from './createUrl'
import { FilterType } from './FilterType'

const TEXT = 'すべて'

export const createAllButton = (filterType: FilterType): HTMLLIElement => {
  switch (filterType) {
    case FilterType.ALL:
      return createCurrentButtonElement(TEXT)
    case FilterType.DISCOUNTED:
      return createNotCurrentButtonElement({
        text: TEXT,
        url: createUrl(FilterType.ALL)
      })
  }
}
