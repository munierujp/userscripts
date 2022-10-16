import { isAlertTextElement } from './isAlertTextElement'

export const findAlertTextElement = (): HTMLParagraphElement | undefined => {
  return Array.from(document.getElementsByTagName('p')).find(element => isAlertTextElement(element))
}
