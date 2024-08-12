import { db } from './db/Database.js'
import type { RestaurantElement } from './elements/RestaurantElement.js'
import { handleError } from './handleError.js'

export class BlockButtonsAppender {
  append (restaurantElements: RestaurantElement[]): void {
    restaurantElements.forEach(restaurantElement => {
      this.appendBlockButtonElement(restaurantElement)
    })
  }

  private appendBlockButtonElement (restaurantElement: RestaurantElement): void {
    const blockButtonElement = this.createBlockButtonElement(restaurantElement)

    if (blockButtonElement !== undefined) {
      restaurantElement.bookmarkElement?.prepend(blockButtonElement)
    }
  }

  private createBlockButtonElement (restaurantElement: RestaurantElement): HTMLElement | undefined {
    const { id, name } = restaurantElement

    if (id === undefined || name === undefined) {
      return undefined
    }

    const blockButtonElement = document.createElement('div')
    blockButtonElement.classList.add(
      'p-btn-bkm__item',
      'list-rst__bookmark-btn'
    )

    const buttonWrapperElement = document.createElement('div')
    blockButtonElement.append(buttonWrapperElement)

    const buttonElement = document.createElement('button')
    buttonElement.classList.add(
      'c-icon-save__target',
      'munierujp-tabelog-blocker-block-icon'
    )
    buttonElement.textContent = 'ブロック'
    const handleClick = async (): Promise<void> => {
      if (window.confirm(`${name}をブロックしますか？`)) {
        restaurantElement.hide()
        await db.restaurants.add({
          id,
          name
        })
      }
    }
    buttonElement.addEventListener('click', () => {
      handleClick().catch(handleError)
    })
    buttonWrapperElement.append(buttonElement)
    return blockButtonElement
  }
}
