import {
  cloneNode,
  isHTMLElement
} from '../../../lib'
import { fetchFilePath } from './fetchFilePath'
import { handleError } from './handleError'
import { isPlayButton } from './isPlayButton'

export class PlayButton {
  constructor (private readonly element: HTMLElement) {}

  static fromMutations (mutations: MutationRecord[]): PlayButton | undefined {
    const element = mutations
      // eslint-disable-next-line unicorn/no-array-callback-reference
      .flatMap(({ addedNodes }) => Array.from(addedNodes).filter(isHTMLElement))
      .find(element => isPlayButton(element))
    return element !== undefined ? new PlayButton(element) : undefined
  }

  replace (): void {
    const button = cloneNode(this.element)
    button.addEventListener('click', () => {
      this.handleClick().catch(handleError)
    })
    this.element.style.display = 'none'
    this.element.after(button)
  }

  private async handleClick (): Promise<void> {
    const path = await fetchFilePath()
    const url = encodeURI(`vlc:///Volumes${path}`)
    window.open(url)
  }
}
