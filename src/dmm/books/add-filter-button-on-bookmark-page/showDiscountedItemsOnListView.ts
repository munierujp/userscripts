export const showDiscountedItemsOnListView = (main: Element): void => {
  const table = main.querySelector('table')

  if (table === null) {
    throw new Error('Missing table.')
  }

  const dataRows = Array.from(table.querySelectorAll('tr')).filter(row => row.querySelector('td'))
  dataRows.forEach(row => {
    const discount = row.querySelector('.price .tx-sp')
    const display = discount !== null ? 'table-row' : 'none'
    row.style.display = display
  })
}
