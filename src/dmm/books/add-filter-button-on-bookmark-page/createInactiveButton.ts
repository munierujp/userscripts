export const createInactiveButton = ({
  label,
  url
}: {
  label: string
  url: URL
}): HTMLLIElement => {
  const link = document.createElement('a')
  link.href = url.toString()
  link.style.paddingLeft = '8px'
  link.style.paddingRight = '8px'
  link.textContent = label

  const button = document.createElement('li')
  button.style.width = 'auto'
  button.append(link)
  return button
}
