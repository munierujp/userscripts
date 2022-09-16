export const createActiveButton = (label: string): HTMLLIElement => {
  const link = document.createElement('span')
  link.style.paddingLeft = '8px'
  link.style.paddingRight = '8px'
  link.textContent = label

  const button = document.createElement('li')
  button.classList.add('current')
  button.style.width = 'auto'
  button.append(link)
  return button
}
