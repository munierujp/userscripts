export class MovieElement {
  constructor (private readonly element: HTMLElement) {}

  get id (): string | undefined {
    return this.element.querySelector('.title a')?.getAttribute('href')?.match(/\/(\d+)\//)?.[1]
  }

  get title (): string | undefined {
    return this.element.querySelector('.title')?.textContent ?? undefined
  }

  get buttonListElement (): Element | undefined {
    return this.element.querySelector('.link-btn') ?? undefined
  }

  append (node: Node): void {
    this.element.append(node)
  }

  hide (): void {
    this.element.style.display = 'none'
  }
}
