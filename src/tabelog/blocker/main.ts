import { BlockLinksAppender } from './BlockLinksAppender'
import { Database } from './db'
import { handleError } from './handleError'
import { RestaurantHider } from './RestaurantHider'

const db = new Database()
const restaurantElements = Array.from(document.querySelectorAll<HTMLElement>('.js-rstlist-info .list-rst'))
const restaurantHider = new RestaurantHider(db)
restaurantHider.hide(restaurantElements).catch(handleError)
const blockLinksAppender = new BlockLinksAppender(db)
blockLinksAppender.append(restaurantElements)
