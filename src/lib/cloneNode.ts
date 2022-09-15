export const cloneNode = <T extends Node>(node: T): T => {
  return node.cloneNode(true) as T
}
