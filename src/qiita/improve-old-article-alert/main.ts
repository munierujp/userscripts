import { findAlertTextElement } from './findAlertTextElement.js'
import { updateAlertTextElement } from './updateAlertTextElement.js'

const alertTextElement = findAlertTextElement()

if (alertTextElement !== undefined) {
  updateAlertTextElement(alertTextElement)
}
