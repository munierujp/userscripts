export const openTab = (url: string): Window | undefined => {
  return window.open(url, '_blank') ?? undefined
}
