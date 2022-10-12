/**
 * 追加ボタン要素を取得します。
 * @returns 追加ボタン要素
 */
export const findAddButton = (): HTMLAnchorElement | undefined => {
  return document.querySelector<HTMLAnchorElement>('a.additem_button[data-status="4"]') ?? undefined
}
