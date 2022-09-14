export const findActionButtonElement = (): HTMLElement | undefined => {
  return document.querySelector<HTMLElement>('button[aria-label="アクション/操作"]') ?? undefined
}
