import type { Database } from './db'
import type { Restaurant } from './db/models'
import { handleError } from './handleError'

export class BlockLinksAppender {
  constructor (private readonly db: Database) {}

  append (restaurantElements: HTMLElement[]): void {
    restaurantElements.forEach(restaurantElement => {
      this.appendLinkElement(restaurantElement)
    })
  }

  private appendLinkElement (restaurantElement: HTMLElement): void {
    const id = restaurantElement.dataset.rstId

    if (id === undefined) {
      return
    }

    const name = restaurantElement.querySelector('.list-rst__rst-name-target')?.textContent ?? undefined

    if (name === undefined) {
      return
    }

    const linkElement = this.createLinkElement({
      id,
      name
    })
    restaurantElement.append(linkElement)
  }

  private createLinkElement (restaurant: Restaurant): HTMLAnchorElement {
    const linkElement = document.createElement('a')
    linkElement.style.cursor = 'pointer'
    linkElement.textContent = 'この店舗をブロックする'
    const handleClick = async (): Promise<void> => {
      if (window.confirm(`${restaurant.name}をブロックしますか？`)) {
        await this.db.restaurants.add({
          id: restaurant.id,
          name: restaurant.name
        })
      }
    }
    linkElement.addEventListener('click', () => {
      handleClick().catch(handleError)
    })
    return linkElement
  }
}
