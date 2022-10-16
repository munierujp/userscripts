/**
 * @see https://json-ld.org/
 */
export const findJsonLdElements = (): HTMLScriptElement[] => {
  return Array.from(document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'))
}
