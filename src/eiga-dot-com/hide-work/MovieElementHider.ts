import type { Database } from './db/Database.js'
import type { MovieElement } from './elements/MovieElement.js'

export class MovieElementHider {
  constructor (private readonly db: Database) {}

  async hideElements (movieElements: MovieElement[]): Promise<void> {
    for (const movieElement of movieElements) {
      await this.hideElement(movieElement)
    }
  }

  async hideElement (movieElement: MovieElement): Promise<void> {
    const { id } = movieElement

    if (id === undefined) {
      return
    }

    const movie = await this.db.movies.get(id)

    if (movie !== undefined) {
      movieElement.hide()
    }
  }
}
