/**
 * @see https://json-ld.org/
 */
export const findJsonLds = (): string[] => {
  return Array.from(document.querySelectorAll('script[type="application/ld+json"]'))
    .map(({ textContent }) => textContent)
    .filter((json): json is NonNullable<typeof json> => json !== null)
}
