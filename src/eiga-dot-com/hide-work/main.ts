import { handleError } from '../../util/handleError.js'
import { createHideButtonItemElement } from './createHideButtonItemElement.js'
import { MovieElement } from './elements/MovieElement.js'
import { hideMovieElement } from './hideMovieElement.js'

const movieElements = Array.from(document.querySelectorAll<HTMLElement>('.list-block'))
  .map(element => new MovieElement(element))
movieElements.forEach(movieElement => {
  hideMovieElement(movieElement).catch(handleError)
  const hideButtonItemElement = createHideButtonItemElement(movieElement)

  if (hideButtonItemElement !== undefined) {
    movieElement.buttonListElement?.append(hideButtonItemElement)
  }
})
