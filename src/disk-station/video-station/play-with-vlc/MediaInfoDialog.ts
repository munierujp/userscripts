import { isElement } from '../../../lib/isElement'
import { findActionButton } from './findActionButton'
import { findMediaInfoLink } from './findMediaInfoLink'

export class MediaInfoDialog {
  constructor (private readonly element: Element) {}

  static fromMutations (mutations: MutationRecord[]): MediaInfoDialog | undefined {
    const element = mutations
      // eslint-disable-next-line unicorn/no-array-callback-reference
      .flatMap(({ addedNodes }) => Array.from(addedNodes).filter(isElement))
      .find(({ classList }) => classList.contains('video-info-dialog'))
    return element !== undefined ? new MediaInfoDialog(element) : undefined
  }

  static open (): void {
    const actionButton = findActionButton()

    if (actionButton === undefined) {
      throw new Error('Missing action button.')
    }

    actionButton.click()
    const mediaInfoLink = findMediaInfoLink()

    if (mediaInfoLink === undefined) {
      throw new Error('Missing media info link.')
    }

    mediaInfoLink.click()
  }

  close (): void {
    const closeButton = this.element.querySelector<HTMLButtonElement>('button[aria-label="閉じる"]')

    if (closeButton === null) {
      throw new Error('Missing close button.')
    }

    closeButton.click()
  }

  findFilePath (): string | undefined {
    return Array.from(this.element.querySelectorAll('tr'))
      .map(row => Array.from(row.querySelectorAll('td')))
      .filter(({ length }) => length >= 2)
      .map(cells => cells.map(({ textContent }) => textContent ?? undefined))
      .filter(([label]) => label === 'ファイル パス')
      .map(([, value]) => value)
      .find(value => value !== undefined)
  }
}
