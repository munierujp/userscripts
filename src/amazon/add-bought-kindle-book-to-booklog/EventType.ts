export const EventType = {
  AMAZON_BOUGHT: 'amazon_bought',
  BOOKLOG_READY: 'booklog_ready'
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type EventType = typeof EventType[keyof typeof EventType]
