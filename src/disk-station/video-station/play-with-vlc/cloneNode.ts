export const cloneNode = <T extends Node>(node: T): T => {
  const clonedNode = node.cloneNode(true)
  return clonedNode as T
}
