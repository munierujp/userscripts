export const MessageType = {
  AmazonBought: 'amazon_bought',
  BooklogReady: 'booklog_ready'
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type MessageType = typeof MessageType[keyof typeof MessageType]
