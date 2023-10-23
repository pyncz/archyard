import * as d3 from 'd3'
import { useElementSize } from '@vueuse/core'

export const usePackChart = (data: number[], padding?: MaybeRef<number>) => {
  const viewportRef = ref(null)
  const { width, height } = useElementSize(viewportRef)

  watchEffect(() => {
    const pack = d3.pack()
      .size([width.value, height.value])
      .padding(padding ? unref(padding) : 1)
  })

  return {
    viewportRef,
  }
}
