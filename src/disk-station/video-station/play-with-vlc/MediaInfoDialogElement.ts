import { isElement } from '../../../util'
import { findActionButtonElement } from './findActionButtonElement'
import { findMediaInfoLinkElement } from './findMediaInfoLinkElement'

export class MediaInfoDialogElement {
  constructor (private readonly element: Element) {}

  static fromMutations (mutations: MutationRecord[]): MediaInfoDialogElement | undefined {
    const element = mutations
      // eslint-disable-next-line unicorn/no-array-callback-reference
      .flatMap(({ addedNodes }) => Array.from(addedNodes).filter(isElement))
      .find(({ classList }) => classList.contains('video-info-dialog'))
    return element !== undefined ? new MediaInfoDialogElement(element) : undefined
  }

  static open (): void {
    const actionButtonElement = findActionButtonElement()

    if (actionButtonElement === undefined) {
      throw new Error('Missing action button element.')
    }

    actionButtonElement.click()
    const mediaInfoLinkElement = findMediaInfoLinkElement()

    if (mediaInfoLinkElement === undefined) {
      throw new Error('Missing media info link element.')
    }

    mediaInfoLinkElement.click()
  }

  close (): void {
    const closeButton = this.findCloseButtonElement()

    if (closeButton === undefined) {
      throw new Error('Missing close button element.')
    }

    closeButton.click()
  }

  private findCloseButtonElement (): HTMLButtonElement | undefined {
    return this.element.querySelector<HTMLButtonElement>('button[aria-label="閉じる"]') ?? undefined
  }

  findFilePath (): string | undefined {
    return this.findRowElements()
      .map(row => Array.from(row.querySelectorAll('td')))
      .filter(({ length }) => length >= 2)
      .map(cells => cells.map(({ textContent }) => textContent ?? undefined))
      .filter(([label]) => label === 'ファイル パス')
      .map(([, value]) => value)
      .find(value => value !== undefined)
  }

  private findRowElements (): HTMLTableRowElement[] {
    return Array.from(this.element.querySelectorAll('tr'))
  }
}
