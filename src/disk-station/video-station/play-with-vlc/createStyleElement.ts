export const createStyleElement = (id: string): HTMLStyleElement => {
  const style = document.createElement('style')
  style.id = id
  style.type = 'text/css'
  return style
}
