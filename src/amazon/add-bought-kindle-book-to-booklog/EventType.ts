export const EventType = {
  AmazonBought: 'amazon_bought',
  BooklogReady: 'booklog_ready'
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type EventType = typeof EventType[keyof typeof EventType]
