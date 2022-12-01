export const extractAsin = (url: URL | string): string | undefined => {
  url = url instanceof URL ? url : new URL(url)
  return url.searchParams.get('asin') ?? undefined
}
