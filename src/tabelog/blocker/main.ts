import { handleError } from '../../util/handleError.js'
import { BlockButtonsAppender } from './BlockButtonsAppender.js'
import { appendStyle } from './dom/appendStyle.js'
import { RestaurantElement } from './dom/element/RestaurantElement.js'
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
