export const Origin = {
  Amazon: 'https://www.amazon.co.jp',
  Booklog: 'https://booklog.jp'
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Origin = typeof Origin[keyof typeof Origin]
