import type { Database } from './db'
import { handleError } from './handleError'

export class BlockLinksAppender {
  constructor (private readonly db: Database) {}

  append (restaurantElements: HTMLElement[]): void {
    restaurantElements.forEach(restaurantElement => {
      this.appendLinkElement(restaurantElement)
    })
  }

  private appendLinkElement (restaurantElement: HTMLElement): void {
    const linkElement = this.createLinkElement(restaurantElement)

    if (linkElement !== undefined) {
      restaurantElement.append(linkElement)
    }
  }

  private createLinkElement (restaurantElement: HTMLElement): HTMLAnchorElement | undefined {
    const id = restaurantElement.dataset.rstId

    if (id === undefined) {
      return undefined
    }

    const name = restaurantElement.querySelector('.list-rst__rst-name-target')?.textContent ?? undefined

    if (name === undefined) {
      return undefined
    }

    const linkElement = document.createElement('a')
    linkElement.style.cursor = 'pointer'
    linkElement.textContent = 'この店舗をブロックする'
    const handleClick = async (): Promise<void> => {
      if (window.confirm(`${name}をブロックしますか？`)) {
        restaurantElement.style.display = 'none'
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
