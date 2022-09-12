export const showDiscountedItemsOnTableView = (main: HTMLElement): void => {
  const list = main.querySelector('#list') ?? undefined

  if (list === undefined) {
    throw new Error('Missing list element.')
  }

  const items = Array.from(list.querySelectorAll('li'))
  items.forEach(item => {
    const discount = item.querySelector('.txtoff') ?? undefined
    const display = discount !== undefined ? 'list-item' : 'none'
    item.style.display = display
  })
}
