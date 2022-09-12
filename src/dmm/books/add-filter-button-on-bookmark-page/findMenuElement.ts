export const findMenuElement = (main: HTMLElement): Element | undefined => {
  return main.querySelector('.d-rcol.selector') ?? undefined
}
