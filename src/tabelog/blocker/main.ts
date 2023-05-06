import { appendStyle } from './appendStyle'
import { BlockButtonsAppender } from './BlockButtonsAppender'
import { Database } from './db'
import { RestaurantElement } from './elements'
import { handleError } from './handleError'
import { RestaurantHider } from './RestaurantHider'

const restaurantElements = Array.from(document.querySelectorAll<HTMLElement>('.js-rstlist-info .list-rst'))
  .map(element => new RestaurantElement(element))

if (restaurantElements.length > 0) {
  appendStyle()
  const db = new Database()
  const restaurantHider = new RestaurantHider(db)
  restaurantHider.hide(restaurantElements).catch(handleError)
  const blockButtonsAppender = new BlockButtonsAppender(db)
  blockButtonsAppender.append(restaurantElements)
}
