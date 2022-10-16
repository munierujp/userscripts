import { differenceInYears } from '../../util/dayjs'
import { findAlertTextElement } from './findAlertTextElement'
import { findArticle } from './findArticle'

export const updateAlert = (): void => {
  const alertTextElement = findAlertTextElement()

  if (alertTextElement === undefined) {
    return
  }

  const article = findArticle()

  if (article === undefined) {
    throw new Error('Missing article.')
  }

  const now = new Date()
  const year = differenceInYears(now, article.dateModified)
  alertTextElement.textContent = `この記事は最終更新日から${year}年以上が経過しています。`
}
