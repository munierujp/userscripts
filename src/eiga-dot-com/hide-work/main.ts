import { handleError } from '../../util/handleError.js'
import { Database } from './db/Database.js'
import { MovieElement } from './elements/MovieElement.js'
import { HideButtonElementAppender } from './HideButtonElementAppender.js'
import { MovieElementHider } from './MovieElementHider.js'

const movieElements = Array.from(document.querySelectorAll<HTMLElement>('.list-block'))
  .map(element => new MovieElement(element))

if (movieElements.length > 0) {
  const db = new Database()
  const hider = new MovieElementHider(db)
  hider.hideElements(movieElements).catch(handleError)
  const appender = new HideButtonElementAppender(db)
  appender.appendHideButtonItemElements(movieElements)
}
