import type { Message } from './message'

export type TxType = `/${string}`

export interface Tx {
  '@type': TxType
  body: {
    messages: Message[]
  }
}

export interface TxResponse {
  tx: Tx
  txhash: string
  timestamp: string
  height: string
}
