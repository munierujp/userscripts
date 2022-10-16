import { differenceInYears } from '../../util/dayjs'
import { findArticle } from './findArticle'

export const updateAlertTextElement = (alertTextElement: HTMLElement): void => {
  const article = findArticle()

  if (article === undefined) {
    throw new Error('Missing article.')
  }

  const { dateModified } = article

  if (dateModified === undefined) {
    throw new Error('Missing dateModified.')
  }

  const now = new Date()
  const year = differenceInYears(now, dateModified)
  alertTextElement.textContent = `この記事は最終更新日から${year}年以上が経過しています。`
}
