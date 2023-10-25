import type { Pagination, Tx, TxResponse } from './core'

export interface CosmosTxV1Beta1TxsResponse {
  txs: Tx[]
  tx_responses: TxResponse[]
  pagination: Pagination
}
