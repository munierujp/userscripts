import { handleError } from '../../util/handleError.js'
import { createHideButtonItemElement } from './createHideButtonItemElement.js'
import { MovieElement } from './elements/MovieElement.js'
import { MovieElementsHider } from './MovieElementsHider.js'

const movieElements = Array.from(document.querySelectorAll<HTMLElement>('.list-block'))
  .map(element => new MovieElement(element))

if (movieElements.length > 0) {
  const hider = new MovieElementsHider()
  hider.hide(movieElements).catch(handleError)

  movieElements.forEach(movieElement => {
    const hideButtonItemElement = createHideButtonItemElement(movieElement)

    if (hideButtonItemElement !== undefined) {
      movieElement.buttonListElement?.append(hideButtonItemElement)
    }
  })
}
