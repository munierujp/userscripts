// TODO: リファクタリング

import { showDiscountedItemsOnListView } from './showDiscountedItemsOnListView'
import { showDiscountedItemsOnTableView } from './showDiscountedItemsOnTableView'
import { ViewType } from './ViewType'

export const getDiscountedItemsShower = (view: ViewType): (main: Element) => void => {
  switch (view) {
    case ViewType.Table:
      return showDiscountedItemsOnTableView
    case ViewType.List:
      return showDiscountedItemsOnListView
  }
}
