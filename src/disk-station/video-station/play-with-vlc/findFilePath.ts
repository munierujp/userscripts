export const findFilePath = (dialog: HTMLElement): string | undefined => {
  return Array.from(dialog.querySelectorAll('tr'))
    .map(row => Array.from(row.querySelectorAll('td')))
    .filter(({ length }) => length >= 2)
    .map(cells => cells.map(({ textContent }) => textContent ?? undefined))
    .filter(([label]) => label === 'ファイル パス')
    .map(([, value]) => value)
    .find(value => value !== undefined)
}
