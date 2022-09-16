export const ButtonLabel = {
  All: 'すべて',
  Discounted: 'セール中'
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ButtonLabel = typeof ButtonLabel[keyof typeof ButtonLabel]
const values = Object.values(ButtonLabel)
export const isButtonLabel = (value: any): value is ButtonLabel => values.includes(value)
