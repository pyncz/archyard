export const useFormatAddress = <T extends string | null | undefined>(
  address: MaybeRefOrGetter<T>,
) => {
  const formattedAddress = useTrim(address, { start: 12, end: 5 })
  return formattedAddress
}
