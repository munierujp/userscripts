export const Origin = {
  AMAZON: 'https://www.amazon.co.jp',
  BOOKLOG: 'https://booklog.jp'
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Origin = typeof Origin[keyof typeof Origin]
