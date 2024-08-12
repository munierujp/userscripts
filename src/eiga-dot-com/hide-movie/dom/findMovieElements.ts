import { MovieElement } from './element/MovieElement.js'

export const findMovieElements = (): MovieElement[] => {
  return Array.from(document.querySelectorAll<HTMLElement>('.list-block'))
    .map(element => new MovieElement(element))
}
