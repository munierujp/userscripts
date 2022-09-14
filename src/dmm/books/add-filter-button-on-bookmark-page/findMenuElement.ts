export const findMenuElement = (main: Element): Element | undefined => {
  return main.querySelector('.d-rcol.selector') ?? undefined
}
