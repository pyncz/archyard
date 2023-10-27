import { useLocalStorage } from '@vueuse/core'
import type { Settings } from '../types'

export const useSettings = () => {
  const settings = useLocalStorage<Settings>('settings', {
    filter: 'received',
  })

  return settings
}
