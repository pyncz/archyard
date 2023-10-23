export interface Currency {
  coinDenom: string
  coinMinimalDenom: string
  coinDecimals: number
  coinGeckoId: string
}

interface BIP44 {
  coinType: number
}

interface Bech32Config {
  bech32PrefixAccAddr: string
  bech32PrefixAccPub: string
  bech32PrefixValAddr: string
  bech32PrefixValPub: string
  bech32PrefixConsAddr: string
  bech32PrefixConsPub: string
}

export interface ChainInfo {
  readonly rpc: string
  readonly rest: string
  readonly chainId: string
  readonly chainName: string
  readonly stakeCurrency: Currency
  readonly walletUrlForStaking?: string
  readonly bip44: BIP44
  readonly alternativeBIP44s?: BIP44[]
  readonly bech32Config: Bech32Config
  readonly currencies: Currency[]
  readonly feeCurrencies: Currency[]
  readonly features?: string[]
}

