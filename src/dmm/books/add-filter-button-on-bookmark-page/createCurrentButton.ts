export const createCurrentButton = (text: string): HTMLLIElement => {
  const label = document.createElement('span')
  label.style.paddingLeft = '8px'
  label.style.paddingRight = '8px'
  label.textContent = text

  const button = document.createElement('li')
  button.classList.add('current')
  button.style.width = 'auto'
  button.append(label)
  return button
}
