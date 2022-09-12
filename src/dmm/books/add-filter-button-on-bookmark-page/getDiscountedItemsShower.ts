
import { showDiscountedItemsOnListView } from './showDiscountedItemsOnListView'
import { showDiscountedItemsOnTableView } from './showDiscountedItemsOnTableView'
import { ViewType } from './ViewType'

export const getDiscountedItemsShower = (view: ViewType): (main: HTMLElement) => void => {
  switch (view) {
    case ViewType.TABLE:
      return showDiscountedItemsOnTableView
    case ViewType.LIST:
      return showDiscountedItemsOnListView
  }
}
