import { handleError } from '../../util/handleError.js'
import { database } from './db/database.js'
import type { MovieElement } from './elements/MovieElement.js'

export const createHideButtonItemElement = (movieElement: MovieElement): HTMLLIElement | undefined => {
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
      await database.movies.add({
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
