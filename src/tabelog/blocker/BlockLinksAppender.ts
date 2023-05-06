import type { Database } from './db'
import type { RestaurantElement } from './elements'
import { handleError } from './handleError'

export class BlockLinksAppender {
  constructor (private readonly db: Database) {}

  append (restaurantElements: RestaurantElement[]): void {
    restaurantElements.forEach(restaurantElement => {
      this.appendLinkElement(restaurantElement)
    })
  }

  private appendLinkElement (restaurantElement: RestaurantElement): void {
    const linkElement = this.createLinkElement(restaurantElement)

    if (linkElement !== undefined) {
      restaurantElement.append(linkElement)
    }
  }

  private createLinkElement (restaurantElement: RestaurantElement): HTMLAnchorElement | undefined {
    const { id, name } = restaurantElement

    if (id === undefined || name === undefined) {
      return undefined
    }

    const linkElement = document.createElement('a')
    linkElement.style.cursor = 'pointer'
    linkElement.textContent = 'この店舗をブロックする'
    const handleClick = async (): Promise<void> => {
      if (window.confirm(`${name}をブロックしますか？`)) {
        restaurantElement.hide()
        await this.db.restaurants.add({
          id,
          name
        })
      }
    }
    linkElement.addEventListener('click', () => {
      handleClick().catch(handleError)
    })
    return linkElement
  }
}
