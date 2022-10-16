import { findAlertTextElement } from './findAlertTextElement'
import { updateAlertTextElement } from './updateAlertTextElement'

const alertTextElement = findAlertTextElement()

if (alertTextElement !== undefined) {
  updateAlertTextElement(alertTextElement)
}
