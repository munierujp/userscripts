import { database } from './db/database.js'
import type { MovieElement } from './elements/MovieElement.js'

export const hideMovieElement = async (movieElement: MovieElement): Promise<void> => {
  const { id } = movieElement

  if (id === undefined) {
    return
  }

  const movie = await database.movies.get(id)

  if (movie !== undefined) {
    movieElement.hide()
  }
}
