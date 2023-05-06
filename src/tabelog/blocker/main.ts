import { BlockLinksAppender } from './BlockLinksAppender'
import { Database } from './db'
import { RestaurantElement } from './elements'
import { handleError } from './handleError'
import { RestaurantHider } from './RestaurantHider'

const restaurantElements = Array.from(document.querySelectorAll<HTMLElement>('.js-rstlist-info .list-rst'))
  .map(element => new RestaurantElement(element))

if (restaurantElements.length > 0) {
  const db = new Database()
  const restaurantHider = new RestaurantHider(db)
  restaurantHider.hide(restaurantElements).catch(handleError)
  const blockLinksAppender = new BlockLinksAppender(db)
  blockLinksAppender.append(restaurantElements)
}
