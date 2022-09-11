export const Origin = {
  /** Amazon */
  AMAZON: 'https://www.amazon.co.jp',
  /** ブクログ */
  BOOKLOG: 'https://booklog.jp'
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Origin = typeof Origin[keyof typeof Origin]
