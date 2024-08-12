import { handleError } from '../../util/handleError.js'
import { appendHideButtonItemElement } from './dom/appendHideButtonItemElement.js'
import { findMovieElements } from './dom/findMovieElements.js'
import { hideMovieElement } from './dom/hideMovieElement.js'

const movieElements = findMovieElements()
movieElements.forEach(movieElement => {
  hideMovieElement(movieElement).catch(handleError)
  appendHideButtonItemElement(movieElement)
})
