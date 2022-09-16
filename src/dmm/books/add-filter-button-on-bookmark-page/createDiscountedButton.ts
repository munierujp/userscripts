// TODO: リファクタリング

import { createCurrentButton } from './createCurrentButton'
import { createNotCurrentButton } from './createNotCurrentButton'
import { createUrl } from './createUrl'
import { FilterType } from './FilterType'

const TEXT = 'セール中'

export const createDiscountedButton = (filterType: FilterType): HTMLLIElement => {
  switch (filterType) {
    case FilterType.All:
      return createNotCurrentButton({
        text: TEXT,
        url: createUrl(FilterType.Discounted)
      })
    case FilterType.Discounted:
      return createCurrentButton(TEXT)
  }
}
