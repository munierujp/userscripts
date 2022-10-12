import { ButtonLabel } from './ButtonLabel'
import { createActiveButton } from './createActiveButton'
import { createInactiveButton } from './createInactiveButton'
import { createUrl } from './createUrl'
import { Filter } from './Filter'

export const createAllButton = (filter: Filter): HTMLLIElement => {
  switch (filter) {
    case Filter.All:
      return createActiveButton(ButtonLabel.All)
    case Filter.Discounted:
      return createInactiveButton({
        label: ButtonLabel.All,
        url: createUrl(Filter.All)
      })
  }
}
