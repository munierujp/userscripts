import { DropdownMenuStyle } from './DropdownMenuStyle'
import { findVideoInfoDialogLinkElement } from './findVideoInfoDialogLinkElement'

export class VideoInfoDialog {
  constructor (private readonly element: Element) {}

  static findFromMutations (mutations: MutationRecord[]): VideoInfoDialog | undefined {
    const element = mutations
      .flatMap(({ addedNodes }) => Array.from(addedNodes).filter((node): node is Element => node instanceof Element))
      .find(({ classList }) => classList.contains('video-info-dialog'))

    if (element === undefined) {
      return undefined
    }

    return new VideoInfoDialog(element)
  }

  // TODO: リファクタリング
  static open (): void {
    const dropdownMenuStyle = DropdownMenuStyle.find()

    if (dropdownMenuStyle === undefined) {
      throw new Error('Missing dropdown menu style element.')
    }

    const actionButton = document.querySelector<HTMLButtonElement>('button[aria-label="アクション/操作"]')

    if (actionButton === null) {
      throw new Error('Missing action button element.')
    }

    dropdownMenuStyle.hideDropdownMenu()
    actionButton.click()
    const videoInfoDialogLink = findVideoInfoDialogLinkElement()

    if (videoInfoDialogLink === undefined) {
      throw new Error('Missing video info dialog link element.')
    }

    videoInfoDialogLink.click()
    dropdownMenuStyle.showDropdownMenu()
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

  close (): void {
    const closeButton = this.element.querySelector<HTMLButtonElement>('button[aria-label="閉じる"]')

    if (closeButton === null) {
      throw new Error('Missing close button element.')
    }

    closeButton.click()
  }
}
