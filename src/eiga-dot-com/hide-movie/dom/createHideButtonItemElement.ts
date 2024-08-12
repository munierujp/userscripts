import { handleError } from '../../../util/handleError.js'
import { db } from '../db/db.js'
import type { MovieElement } from './element/MovieElement.js'

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
  hideButtonElement.addEventListener('click', () => {
    (async () => {
      if (window.confirm(`${title}を非表示にしますか？`)) {
        movieElement.hide()
        await db.movies.add({
          id,
          title
        })
      }
    })().catch(handleError)
  })
  hideButtonItemElement.append(hideButtonElement)
  return hideButtonItemElement
}
