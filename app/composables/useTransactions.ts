import { useInfiniteQuery } from '@tanstack/vue-query'
import type { CosmosTxV1Beta1TxsResponse, FilterType } from '../types'

interface UseTransactionsOptions {
  limit?: number
}

type KeyWithValueType<T, V> = { [P in keyof T]: T[P] extends V ? P : never }[keyof T]

export const useTransactions = <T extends KeyWithValueType<CosmosTxV1Beta1TxsResponse, any[]>>(
  address: MaybeRefOrGetter<string | null | undefined>,
  chain: MaybeRefOrGetter<ChainId | null | undefined>,
  filter: MaybeRefOrGetter<FilterType | null | undefined>,
  field: T,
  options?: UseTransactionsOptions,
) => {
  const {
    limit = 100,
  } = options ?? {}

  const total = ref<number | null>(null)
  const config = useChainConfig(chain)

  const fetchTxs = async ({ pageParam }: { pageParam?: string | number }) => {
    const addressValue = toValue(address)
    const chainConfigValue = toValue(config)
    const filterValue = toValue(filter) ?? 'received'

    if (!addressValue || !chainConfigValue) {
      throw new Error('Both address and chain should be specified!')
    }

    const res = await $fetch<CosmosTxV1Beta1TxsResponse>('/cosmos/tx/v1beta1/txs', {
      baseURL: chainConfigValue.rest,
      params: {
        'pagination.limit': limit,
        'pagination.key': pageParam,
        'events': [
          // TODO: figure out how to send OR and not AND
          filterValue === 'received'
            ? `transfer.recipient='${addressValue}'`
            : `transfer.sender='${addressValue}'`,
        ],
      },
    })

    // update total count
    total.value = parseInt(res.pagination.total) ?? null

    return res
  }

  // Handle a unique address + chain combination as a new query
  const queryKey = computed(() => [toValue(address), toValue(chain)])
  // Also, reset results' total when new query is about to fire
  watch(queryKey, () => {
    total.value = null
  })

  const queryState = useInfiniteQuery({
    queryKey,
    queryFn: fetchTxs,
    initialPageParam: undefined,
    getNextPageParam: lastPage => lastPage?.pagination.next_key,
    enabled: () => !!toValue(address) && !!toValue(chain),
  })

  // @ts-expect-error Page typings
  const data = computed<CosmosTxV1Beta1TxsResponse[typeof field] | undefined>(() => queryState.data.value?.pages.flatMap((page) => {
    return page[field]
  }))
  const count = computed(() => data.value?.length)

  return {
    ...queryState,
    data,
    count,
    total,
  }
}
