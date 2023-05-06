export class RestaurantElement {
  constructor (private readonly element: HTMLElement) {}

  get id (): string | undefined {
    return this.element.dataset.rstId
  }

  get name (): string | undefined {
    return this.element.querySelector('.list-rst__rst-name-target')?.textContent ?? undefined
  }

  append (node: Node): void {
    this.element.append(node)
  }

  hide (): void {
    this.element.style.display = 'none'
  }
}
