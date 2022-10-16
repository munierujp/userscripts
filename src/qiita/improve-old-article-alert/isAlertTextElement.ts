export const isAlertTextElement = (node: Node): boolean => {
  const { textContent } = node
  return textContent !== null && /^この記事は最終更新日から\d+年以上が経過しています。$/.test(textContent)
}
