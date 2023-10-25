import type { ChainInfo } from '../types'
import * as chains from './chains'

export const getChainConfig = <T extends string | undefined>(id: T) => {
  return (
    Object.values(chains).find(chain => chain.chainId === id)
  ) as T extends undefined
    ? undefined
    : T extends ChainId
      ? (ChainInfo & { chainId: ChainId })
      : (ChainInfo | undefined)
}
