import type { Message } from './message'

export type TxType = `/${string}`

export interface Tx {
  '@type': TxType
  body: {
    messages: Message[]
  }
}

export interface EventAttribute {
  key: string
  value: string
}

export interface LogEvent {
  type: string
  attributes: EventAttribute[]
}

export interface Log {
  events: LogEvent[]
}

export interface TxResponse {
  tx: Tx
  txhash: string
  timestamp: string
  height: string
  logs: Log[]
}
