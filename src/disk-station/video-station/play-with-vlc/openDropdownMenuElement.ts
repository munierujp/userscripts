import { findOperationButtonElement } from './findOperationButtonElement'

export const openDropdownMenuElement = (): void => {
  const operationButton = findOperationButtonElement()
  operationButton?.click()
}
