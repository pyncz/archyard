interface UseTrimOptions {
  /**
   * Number of symbold at the beginning of the string to persist
   * @default 0
   */
  start?: number

  /**
   * Number of symbold at the end of the string to persist
   * @default 0
   */
  end?: number

  /**
   * String to use instead of the trimmed symbold
   * @default "..."
   */
  filler?: string
}

export const useTrim = <T extends string | null | undefined>(
  value: MaybeRefOrGetter<T>,
  options: UseTrimOptions,
) => {
  const {
    start = 0,
    end = 0,
    filler = '...',
  } = options

  if (!start && !end) {
    throw new Error('Specify at least one of the `start` and `end` options!')
  }

  return computed(() => {
    const v = toValue(value)

    return (
      // check if there's need to trim, or the value is short enough already
      !v || v.length <= filler.length + start + end
        ? v
        : `${v.slice(0, start)}${filler}${v.slice(-end)}`
    ) as T extends string ? string : T
  })
}
