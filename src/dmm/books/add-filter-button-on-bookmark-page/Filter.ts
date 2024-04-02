export const Filter = {
  All: 'all',
  Discounted: 'discounted'
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Filter = typeof Filter[keyof typeof Filter]
const values = Object.values(Filter)
// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
export const isFilter = (value: any): value is Filter => values.includes(value)
