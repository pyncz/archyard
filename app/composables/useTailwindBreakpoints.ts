import resolveConfig from 'tailwindcss/resolveConfig'
import { useBreakpoints } from '@vueuse/core'
import tailwindConfig from '../tailwind.config'

const fullConfig = resolveConfig(tailwindConfig as any)
const screensConfig = fullConfig.theme.screens as Record<string, string>

export const useTailwindBreakpoints = () => {
  return useBreakpoints(screensConfig)
}
