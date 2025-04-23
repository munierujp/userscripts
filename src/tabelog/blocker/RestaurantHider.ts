import { db } from './db/db.js'
import type { RestaurantElement } from './dom/element/RestaurantElement.js'

// TODO: 関数化
export class RestaurantHider {
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

    const restaurant = await db.restaurants.get(id)

    if (restaurant !== undefined) {
      restaurantElement.hide()
    }
  }
}
