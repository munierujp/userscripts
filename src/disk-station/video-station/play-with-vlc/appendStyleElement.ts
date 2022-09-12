import { createStyleElement } from './createStyleElement'

export const appendStyleElement = (id: string): void => {
  const style = createStyleElement(id)
  document.head.append(style)
}
