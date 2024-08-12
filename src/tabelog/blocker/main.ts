import { appendStyle } from './appendStyle.js'
import { BlockButtonsAppender } from './BlockButtonsAppender.js'
import { RestaurantElement } from './dom/element/RestaurantElement.js'
import { handleError } from './handleError.js'
import { RestaurantHider } from './RestaurantHider.js'

const restaurantElements = Array.from(document.querySelectorAll<HTMLElement>('.js-rstlist-info .list-rst'))
  .map(element => new RestaurantElement(element))

if (restaurantElements.length > 0) {
  appendStyle()
  const restaurantHider = new RestaurantHider()
  restaurantHider.hide(restaurantElements).catch(handleError)
  const blockButtonsAppender = new BlockButtonsAppender()
  blockButtonsAppender.append(restaurantElements)
}
