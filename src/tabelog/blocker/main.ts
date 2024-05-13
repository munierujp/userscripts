import { appendStyle } from './appendStyle.js'
import { BlockButtonsAppender } from './BlockButtonsAppender.js'
import { Database } from './db/Database.js'
import { RestaurantElement } from './elements/RestaurantElement.js'
import { handleError } from './handleError.js'
import { RestaurantHider } from './RestaurantHider.js'

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
