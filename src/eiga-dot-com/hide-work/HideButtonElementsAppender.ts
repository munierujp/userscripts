import { handleError } from '../../util/handleError.js'
import type { Database } from './db/Database.js'
import type { MovieElement } from './elements/MovieElement.js'

export class HideButtonElementsAppender {
  constructor (private readonly db: Database) {}

  append (movieElements: MovieElement[]): void {
    movieElements.forEach(movieElement => {
      this.appendHideButtonItemElement(movieElement)
    })
  }

  private appendHideButtonItemElement (movieElement: MovieElement): void {
    const hideButtonElement = this.createHideButtonItemElement(movieElement)

    if (hideButtonElement !== undefined) {
      movieElement.buttonListElement?.append(hideButtonElement)
    }
  }

  private createHideButtonItemElement (movieElement: MovieElement): HTMLElement | undefined {
    const { id, title } = movieElement

    if (id === undefined || title === undefined) {
      return undefined
    }

    const hideButtonItemElement = document.createElement('li')
    const hideButtonElement = document.createElement('a')
    hideButtonElement.classList.add(
      'btn',
      'small'
    )
    const hideButtonLabelElement = document.createElement('span')
    hideButtonLabelElement.classList.add(
      'icon',
      'block'
    )
    hideButtonLabelElement.textContent = '非表示'
    hideButtonElement.append(hideButtonLabelElement)
    const handleClick = async (): Promise<void> => {
      if (window.confirm(`${title}を非表示にしますか？`)) {
        movieElement.hide()
        await this.db.movies.add({
          id,
          title
        })
      }
    }
    hideButtonElement.addEventListener('click', () => {
      handleClick().catch(handleError)
    })
    hideButtonItemElement.append(hideButtonElement)
    return hideButtonItemElement
  }
}
