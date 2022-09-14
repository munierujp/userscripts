// TODO: リファクタリング
export const findOperationButtonElement = (): HTMLButtonElement | undefined => {
  return document.querySelector<HTMLButtonElement>('button[aria-label="アクション/操作"]') ?? undefined
}
