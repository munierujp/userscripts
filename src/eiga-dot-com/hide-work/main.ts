import { handleError } from '../../util/handleError.js'
import { Database } from './db/Database.js'
import { MovieElement } from './elements/MovieElement.js'
import { HideButtonElementsAppender } from './HideButtonElementsAppender.js'
import { MovieElementsHider } from './MovieElementsHider.js'

const movieElements = Array.from(document.querySelectorAll<HTMLElement>('.list-block'))
  .map(element => new MovieElement(element))

if (movieElements.length > 0) {
  const db = new Database()
  const hider = new MovieElementsHider(db)
  hider.hide(movieElements).catch(handleError)
  const appender = new HideButtonElementsAppender(db)
  appender.append(movieElements)
}
