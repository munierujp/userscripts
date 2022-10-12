export const Message = {
  AmazonBought: 'amazon_bought',
  BooklogReady: 'booklog_ready'
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type Message = typeof Message[keyof typeof Message]
