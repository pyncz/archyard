import type { Tx, TxResponse } from './tx'
import type { Pagination } from './pagination'

export interface CosmosTxV1Beta1TxsResponse {
  txs: Tx[]
  tx_responses: TxResponse[]
  pagination: Pagination
}
