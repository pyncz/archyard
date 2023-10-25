import { useInfiniteQuery } from '@tanstack/vue-query'
import type { CosmosTxV1Beta1TxsResponse } from '../types'

interface UseTransactionsOptions {
  limit?: number
}

export const useTransactions = (
  address: MaybeRefOrGetter<string | null | undefined>,
  chain: MaybeRefOrGetter<ChainId | null | undefined>,
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

    if (!addressValue || !chainConfigValue) {
      throw new Error('Both address and chain should be specified!')
    }

    const res = await $fetch<CosmosTxV1Beta1TxsResponse>('/cosmos/tx/v1beta1/txs', {
      baseURL: chainConfigValue.rest,
      params: {
        'pagination.limit': limit,
        'pagination.key': pageParam,
        'events': [
          `transfer.sender='${addressValue}'`,
          `transfer.recipient='${addressValue}'`,
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

  const txResponses = computed(() => queryState.data.value?.pages.flatMap(page => page.tx_responses))
  const count = computed(() => txResponses.value?.length)

  return {
    ...queryState,
    data: txResponses,
    count,
    total,
  }
}
