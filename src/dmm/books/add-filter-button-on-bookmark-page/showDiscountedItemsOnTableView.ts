export const showDiscountedItemsOnTableView = (main: HTMLElement): void => {
  const list = main.querySelector('#list')

  if (list === null) {
    throw new Error('Missing list element.')
  }

  const items = Array.from(list.querySelectorAll('li'))
  items.forEach(item => {
    const discount = item.querySelector('.txtoff')
    const display = discount !== null ? 'list-item' : 'none'
    item.style.display = display
  })
}
