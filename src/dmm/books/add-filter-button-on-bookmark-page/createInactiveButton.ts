export const createInactiveButton = ({
  text,
  url
}: {
  text: string
  url: URL
}): HTMLLIElement => {
  const label = document.createElement('a')
  label.href = url.toString()
  label.style.paddingLeft = '8px'
  label.style.paddingRight = '8px'
  label.textContent = text

  const button = document.createElement('li')
  button.style.width = 'auto'
  button.append(label)
  return button
}
