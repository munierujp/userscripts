import { isAlertTextElement } from './isAlertTextElement.js'

export const findAlertTextElement = (): HTMLParagraphElement | undefined => {
  return Array.from(document.getElementsByTagName('p')).find(element => isAlertTextElement(element))
}
