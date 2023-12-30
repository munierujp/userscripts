import { isElement } from '../../../util'

const checkboxElement = document.getElementById('autoscroll')

if (checkboxElement === null) {
  throw new Error('Checkbox element is missing.')
}

const labelElement = document.querySelector('label[for="autoscroll"]')

if (labelElement === null) {
  throw new Error('Label element is missing.')
}

const observer = new MutationObserver((mutations) => {
  const isOff = mutations
    .map(({ target }) => target)
    // eslint-disable-next-line unicorn/no-array-callback-reference
    .filter(isElement)
    .some(({ classList }) => classList.contains('Tab_off__wzixv'))

  if (isOff) {
    checkboxElement.click()
  }
})
observer.observe(labelElement, {
  attributes: true,
  attributeFilter: ['class']
})
