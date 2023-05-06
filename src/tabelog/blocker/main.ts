import { BlockLinksAppender } from './BlockLinksAppender'
import { Database } from './db'
import { RestaurantElement } from './elements'
import { handleError } from './handleError'
import { RestaurantHider } from './RestaurantHider'

const db = new Database()
const restaurantElements = Array.from(document.querySelectorAll<HTMLElement>('.js-rstlist-info .list-rst'))
  .map(element => new RestaurantElement(element))
const restaurantHider = new RestaurantHider(db)
restaurantHider.hide(restaurantElements).catch(handleError)
const blockLinksAppender = new BlockLinksAppender(db)
blockLinksAppender.append(restaurantElements)
