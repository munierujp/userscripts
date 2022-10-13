import { ButtonLabel } from './ButtonLabel'
import { createActiveButtonElement } from './createActiveButtonElement'
import { createInactiveButtonElement } from './createInactiveButtonElement'
import { createUrl } from './createUrl'
import { Filter } from './Filter'

export const createAllButtonElement = (filter: Filter): HTMLLIElement => {
  switch (filter) {
    case Filter.All:
      return createActiveButtonElement(ButtonLabel.All)
    case Filter.Discounted:
      return createInactiveButtonElement({
        label: ButtonLabel.All,
        url: createUrl(Filter.All)
      })
  }
}
