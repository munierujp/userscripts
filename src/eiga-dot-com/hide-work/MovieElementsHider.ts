import { database } from './db/db.js'
import type { MovieElement } from './elements/MovieElement.js'

export class MovieElementsHider {
  async hide (elements: MovieElement[]): Promise<void> {
    for (const element of elements) {
      await this.hideElement(element)
    }
  }

  private async hideElement (element: MovieElement): Promise<void> {
    const { id } = element

    if (id === undefined) {
      return
    }

    const movie = await database.movies.get(id)

    if (movie !== undefined) {
      element.hide()
    }
  }
}
