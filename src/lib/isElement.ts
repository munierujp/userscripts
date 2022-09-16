export const isElement = (value: unknown): value is Element => {
  return value instanceof Element
}
