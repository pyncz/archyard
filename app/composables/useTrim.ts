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

export const useTrim = (
  value: MaybeRefOrGetter<string>,
  options: UseTrimOptions,
) => {
  const {
    start = 0,
    end = 0,
    filler = '...',
  } = options ?? {}

  if (!start && !end) {
    throw new Error('Specify at least one of the `start` and `end` options!')
  }

  return computed(() => {
    const v = toValue(value)

    // no need to trim, the value is short enough already
    if (v.length <= filler.length + start + end) {
      return v
    }

    return `${v.slice(0, start)}${filler}${v.slice(-end)}`
  })
}
