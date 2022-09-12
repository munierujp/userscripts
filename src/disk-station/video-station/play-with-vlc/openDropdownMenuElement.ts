import { findOperationButtonElement } from './findOperationButtonElement'

export const openDropdownMenuElement = (): void => {
  const operationButton = findOperationButtonElement()

  if (operationButton === undefined) {
    throw new Error('Missing operation button element.')
  }

  operationButton.click()
}
