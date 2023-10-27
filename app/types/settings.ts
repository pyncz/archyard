const _filters = ['received', 'sent'] as const

export const filters = _filters.map(x => x)
export type FilterType = typeof _filters[number]

export interface Settings {
  filter: FilterType
}
