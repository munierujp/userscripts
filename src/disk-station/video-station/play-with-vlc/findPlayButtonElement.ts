import { createHTMLElementFinder } from './createHTMLElementFinder'
import { isPlayButtonElement } from './isPlayButtonElement'

export const findPlayButtonElement = createHTMLElementFinder(element => {
  return isPlayButtonElement(element)
})
