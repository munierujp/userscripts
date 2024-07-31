import { handleError } from '../../util/handleError.js'
import { MovieElement } from './elements/MovieElement.js'
import { HideButtonElementsAppender } from './HideButtonElementsAppender.js'
import { MovieElementsHider } from './MovieElementsHider.js'

const movieElements = Array.from(document.querySelectorAll<HTMLElement>('.list-block'))
  .map(element => new MovieElement(element))

if (movieElements.length > 0) {
  const hider = new MovieElementsHider()
  hider.hide(movieElements).catch(handleError)
  const appender = new HideButtonElementsAppender()
  appender.append(movieElements)
}
