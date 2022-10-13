import { ButtonLabel } from './ButtonLabel'
import { createActiveButtonElement } from './createActiveButtonElement'
import { createInactiveButton } from './createInactiveButton'
import { createUrl } from './createUrl'
import { Filter } from './Filter'

export const createAllButtonElement = (filter: Filter): HTMLLIElement => {
  switch (filter) {
    case Filter.All:
      return createActiveButtonElement(ButtonLabel.All)
    case Filter.Discounted:
      return createInactiveButton({
        label: ButtonLabel.All,
        url: createUrl(Filter.All)
      })
  }
}
