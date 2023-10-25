/**
 * Aggregates list of items by specific field
 * @param data List of the items to process
 * @param getKeys A function that takes a single item of the list as an argument
 * and returns an array of associated keys under which that item should be represented
 * @param getValue A function that takes a single item of the list as an argument
 * and returns an associated value to store
 * @returns Aggregated map of items by keys, Map<Key, Data[]>
 */
export const useAggregatedData = <T, TKey, TValue>(
  data: MaybeRefOrGetter<T[] | null | undefined>,
  getKeys: (x: T) => TKey[],
  getValue: (x: T) => TValue,
) => {
  const aggregatedData = computed(() => {
    const res = new Map<TKey, TValue[]>()

    const rawData = toValue(data)
    if (rawData) {
      for (const item of rawData) {
        for (const key of getKeys(item)) {
          const keyValues = res.get(key)
          const value = getValue(item)
          if (keyValues) {
            keyValues.push(value)
          } else {
            res.set(key, [value])
          }
        }
      }
    }

    return res
  })

  return aggregatedData
}
