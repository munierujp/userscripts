import { db } from './db/db.js'
import type { MovieElement } from './dom/element/MovieElement.js'

export const hideMovieElement = async (movieElement: MovieElement): Promise<void> => {
  const { id } = movieElement

  if (id === undefined) {
    return
  }

  const movie = await db.movies.get(id)

  if (movie !== undefined) {
    movieElement.hide()
  }
}
