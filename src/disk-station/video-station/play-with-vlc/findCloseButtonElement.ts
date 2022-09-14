// TODO: リファクタリング
export const findCloseButtonElement = (dialog: Element): HTMLButtonElement | undefined => {
  return dialog.querySelector<HTMLButtonElement>('button[aria-label="閉じる"]') ?? undefined
}
