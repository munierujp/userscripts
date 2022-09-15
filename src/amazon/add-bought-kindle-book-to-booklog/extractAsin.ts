export const extractAsin = (url: URL): string | undefined => {
  return url.searchParams.get('asin') ?? undefined
}
