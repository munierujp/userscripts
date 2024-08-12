import { createHideButtonItemElement } from './createHideButtonItemElement.js'
import type { MovieElement } from './element/MovieElement.js'

export const appendHideButtonItemElement = (movieElement: MovieElement): void => {
  const hideButtonItemElement = createHideButtonItemElement(movieElement)

  if (hideButtonItemElement !== undefined) {
    movieElement.buttonListElement?.append(hideButtonItemElement)
  }
}
