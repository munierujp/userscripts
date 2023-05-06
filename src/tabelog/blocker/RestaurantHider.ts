import type { Database } from './db'
import type { RestaurantElement } from './elements'
import { handleError } from './handleError'

export class RestaurantHider {
  constructor (private readonly db: Database) {}

  async hide (restaurantElements: RestaurantElement[]): Promise<void> {
    restaurantElements.forEach(restaurantElement => {
      this.hideRestaurant(restaurantElement).catch(handleError)
    })
  }

  async hideRestaurant (restaurantElement: RestaurantElement): Promise<void> {
    const { id } = restaurantElement

    if (id === undefined) {
      return
    }

    const restaurant = await this.db.restaurants.get(id)

    if (restaurant !== undefined) {
      restaurantElement.hide()
    }
  }
}
