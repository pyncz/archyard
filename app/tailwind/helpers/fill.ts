type Getter = (i: number, vol: number) => string

/**
 * Fill values for enumerable props
 */
export const fill = (
  volume: number,
  valueGetter: Getter,
  keyGetter: Getter = i => `${i + 1}`,
) => {
  const config: Record<string, string> = {}

  for (let i = 0; i < volume; i++) {
    config[keyGetter(i, volume)] = valueGetter(i, volume)
  }

  return config
}
