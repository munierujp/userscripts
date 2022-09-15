export const findMenu = (main: Element): Element | undefined => {
  return main.querySelector('.d-rcol.selector') ?? undefined
}
