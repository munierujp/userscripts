export const findAddButton = (): HTMLAnchorElement | undefined => {
  return document.querySelector<HTMLAnchorElement>('a.additem_button[data-status="4"]') ?? undefined
}
