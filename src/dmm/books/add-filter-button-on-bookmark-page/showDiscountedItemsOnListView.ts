export const showDiscountedItemsOnListView = (main: HTMLElement): void => {
  const table = main.querySelector('table') ?? undefined

  if (table === undefined) {
    throw new Error('Missing table element.')
  }

  const dataRows = Array.from(table.querySelectorAll('tr')).filter(row => row.querySelector('td'))
  dataRows.forEach(row => {
    const discount = row.querySelector('.price .tx-sp')
    const display = discount !== undefined ? 'table-row' : 'none'
    row.style.display = display
  })
}
