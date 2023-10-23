import type { ChainInfo, Currency } from '../../types'

const currency = {
  coinDenom: 'ARCH',
  coinMinimalDenom: 'aarch',
  coinDecimals: 18,
  coinGeckoId: 'archway-network',
} satisfies Currency

export const mainnet = {
  chainId: 'archway-1',
  chainName: 'Archway',
  rpc: 'https://rpc.mainnet.archway.io',
  rest: 'https://api.mainnet.archway.io',
  stakeCurrency: currency,
  bip44: { coinType: 118 },
  bech32Config: {
    bech32PrefixAccAddr: 'archway',
    bech32PrefixAccPub: 'archwaypub',
    bech32PrefixValAddr: 'archwayvaloper',
    bech32PrefixValPub: 'archwayvaloperpub',
    bech32PrefixConsAddr: 'archwayvalcons',
    bech32PrefixConsPub: 'archwayvalconspub',
  },
  currencies: [currency] as Currency[],
  feeCurrencies: [currency] as Currency[],
  features: ['cosmwasm', 'ibc-transfer', 'ibc-go'] as string[],
} as const satisfies ChainInfo
