export const isAlertTextElement = (element: Element): boolean => {
  const { textContent } = element
  return textContent !== null && /^この記事は最終更新日から\d年以上が経過しています。$/.test(textContent)
}
