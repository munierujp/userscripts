export class VideoInfoDialog {
  constructor (private readonly element: HTMLElement) {}

  static fromMutations (mutations: MutationRecord[]): VideoInfoDialog | undefined {
    const videoInfoDialog = mutations
      .flatMap(({ addedNodes }) => Array.from(addedNodes).filter((node): node is HTMLElement => node instanceof HTMLElement))
      .find(({ classList }) => classList.contains('video-info-dialog'))

    if (videoInfoDialog === undefined) {
      return undefined
    }

    return new VideoInfoDialog(videoInfoDialog)
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
