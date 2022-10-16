import { findJsonLdElements } from './findJsonLdElements'

export const findJsonLds = (): string[] => {
  const jsonLdElements = findJsonLdElements()
  return jsonLdElements
    .map(({ textContent }) => textContent)
    .filter((json): json is NonNullable<typeof json> => json !== null)
}
