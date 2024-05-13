import { ButtonLabel } from './ButtonLabel.js'
import { createActiveButtonElement } from './createActiveButtonElement.js'
import { createInactiveButtonElement } from './createInactiveButtonElement.js'
import { createUrl } from './createUrl.js'
import { Filter } from './Filter.js'

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
