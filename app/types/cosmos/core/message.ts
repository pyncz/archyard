import type { Amount } from './amount'

export type MessageType = `/${string}`

export interface Message {
  '@type': MessageType
  from_address: string
  to_address: string
  amount?: Amount[]
}
