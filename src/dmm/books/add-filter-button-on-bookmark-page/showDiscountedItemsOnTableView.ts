// TODO: リファクタリング

export const showDiscountedItemsOnTableView = (main: Element): void => {
  const list = main.querySelector('#list')

  if (list === null) {
    throw new Error('Missing list.')
  }

  const items = Array.from(list.querySelectorAll('li'))
  items.forEach(item => {
    const discount = item.querySelector('.txtoff')
    const display = discount !== null ? 'list-item' : 'none'
    item.style.display = display
  })
}
