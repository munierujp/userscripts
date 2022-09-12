import { createHTMLElementFinder } from './createHTMLElementFinder'
import { isVideoInfoDialogElement } from './isVideoInfoDialogElement'

export const findVideoInfoDialogElement = createHTMLElementFinder(element => {
  return isVideoInfoDialogElement(element)
})
