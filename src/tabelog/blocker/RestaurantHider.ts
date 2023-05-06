import type { Database } from './db'
import { handleError } from './handleError'

export class RestaurantHider {
  constructor (private readonly db: Database) {}

  async hide (restaurantElements: HTMLElement[]): Promise<void> {
    restaurantElements.forEach(restaurantElement => {
      this.hideRestaurant(restaurantElement).catch(handleError)
    })
  }

  async hideRestaurant (restaurantElement: HTMLElement): Promise<void> {
    const id = restaurantElement.dataset.rstId

    if (id === undefined) {
      return
    }

    const restaurant = await this.db.restaurants.get(id)

    if (restaurant !== undefined) {
      restaurantElement.style.display = 'none'
    }
  }
}
