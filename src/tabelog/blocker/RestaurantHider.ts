import type { Database } from './db'
import type { RestaurantElement } from './elements'

export class RestaurantHider {
  constructor (private readonly db: Database) {}

  async hide (restaurantElements: RestaurantElement[]): Promise<void> {
    for (const restaurantElement of restaurantElements) {
      await this.hideRestaurant(restaurantElement)
    }
  }

  private async hideRestaurant (restaurantElement: RestaurantElement): Promise<void> {
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
