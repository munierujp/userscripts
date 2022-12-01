import {
  cloneNode,
  isHTMLElement
} from '../../../util'
import { fetchFilePath } from './fetchFilePath'
import { handleError } from './handleError'

export class PlayButtonElement {
  constructor (private readonly element: HTMLElement) {}

  static fromMutations (mutations: MutationRecord[]): PlayButtonElement | undefined {
    const element = mutations
      // eslint-disable-next-line unicorn/no-array-callback-reference
      .flatMap(({ addedNodes }) => Array.from(addedNodes).filter(isHTMLElement))
      .find(element => PlayButtonElement.isPlayButtonElement(element))
    return element === undefined ? undefined : new PlayButtonElement(element)
  }

  private static isPlayButtonElement (element: Element): boolean {
    const { classList } = element
    return classList.contains('x-btn') && classList.contains('play')
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
