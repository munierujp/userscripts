// TODO: リファクタリング

import { createCurrentButton } from './createCurrentButton'
import { createNotCurrentButton } from './createNotCurrentButton'
import { createUrl } from './createUrl'
import { FilterType } from './FilterType'

const TEXT = 'すべて'

export const createAllButton = (filterType: FilterType): HTMLLIElement => {
  switch (filterType) {
    case FilterType.All:
      return createCurrentButton(TEXT)
    case FilterType.Discounted:
      return createNotCurrentButton({
        text: TEXT,
        url: createUrl(FilterType.All)
      })
  }
}
