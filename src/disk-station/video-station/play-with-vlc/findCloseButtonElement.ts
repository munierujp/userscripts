// TODO: リファクタリング
export const findCloseButtonElement = (dialog: HTMLElement): HTMLButtonElement | undefined => {
  return dialog.querySelector<HTMLButtonElement>('button[aria-label="閉じる"]') ?? undefined
}
