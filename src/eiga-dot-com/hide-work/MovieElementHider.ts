import type { Database } from './db/Database.js'
import type { MovieElement } from './elements/MovieElement.js'

export class MovieElementHider {
  constructor (private readonly db: Database) {}

  async hideElements (elements: MovieElement[]): Promise<void> {
    for (const element of elements) {
      await this.hideElement(element)
    }
  }

  async hideElement (element: MovieElement): Promise<void> {
    const { id } = element

    if (id === undefined) {
      return
    }

    const movie = await this.db.movies.get(id)

    if (movie !== undefined) {
      element.hide()
    }
  }
}
