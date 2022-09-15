import { createCurrentButton } from './createCurrentButton'
import { createNotCurrentButtonElement } from './createNotCurrentButtonElement'
import { createUrl } from './createUrl'
import { FilterType } from './FilterType'

const TEXT = 'セール中'

export const createDiscountedButton = (filterType: FilterType): HTMLLIElement => {
  switch (filterType) {
    case FilterType.ALL:
      return createNotCurrentButtonElement({
        text: TEXT,
        url: createUrl(FilterType.DISCOUNTED)
      })
    case FilterType.DISCOUNTED:
      return createCurrentButton(TEXT)
  }
}
