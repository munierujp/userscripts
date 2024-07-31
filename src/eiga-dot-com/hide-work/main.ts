import { handleError } from '../../util/handleError.js'
import { createHideButtonItemElement } from './createHideButtonItemElement.js'
import { findMovieElements } from './findMovieElements.js'
import { hideMovieElement } from './hideMovieElement.js'

const movieElements = findMovieElements()
movieElements.forEach(movieElement => {
  hideMovieElement(movieElement).catch(handleError)
  const hideButtonItemElement = createHideButtonItemElement(movieElement)

  if (hideButtonItemElement !== undefined) {
    movieElement.buttonListElement?.append(hideButtonItemElement)
  }
})
