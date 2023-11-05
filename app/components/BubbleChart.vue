<template>
  <div ref="viewportRef">
    <slot v-bind="{ highlightedData, throttledHighlightedData, copied }" />
    <svg
      ref="chart"
      class="tw-text-[10px]"
      text-anchor="middle"
      :width="width"
      :height="height"
      :viewBox="`0, 0, ${width ?? 0}, ${height ?? 0}`"
    >
      <g />
    </svg>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { refThrottled, useClipboard, useElementSize, watchDebounced } from '@vueuse/core'
import * as d3 from 'd3'

type BubbleChartDatum<TData extends Record<string, any>> = TData & {
  children?: BubbleChartDatum<TData>[]
}

interface Props {
  padding?: number
  data: BubbleChartDatum<T>[]
  getValue: (d: BubbleChartDatum<T>) => number
  getLabel?: (d: BubbleChartDatum<T>) => string
}

const props = withDefaults(defineProps<Props>(), {
  padding: 5,
})

const getStringValue = (d: BubbleChartDatum<T>) => props.getValue(d).toString()
const {
  getValue,
  getLabel = getStringValue,
} = props

const chart = ref<SVGElement | null>(null)
const viewportRef = ref<HTMLDivElement | null>(null)
const { width, height } = useElementSize(viewportRef)

const { copy, copied } = useClipboard()

const highlightedData = ref<Ref<BubbleChartDatum<T>> | null>(null)

const throttledHighlightedData = refThrottled(highlightedData, 100)

watchDebounced([width, height, viewportRef, chart, () => props.data, () => props.padding], () => {
  if (!width.value || !height.value || !viewportRef.value || !chart.value) {
    return
  }

  const pack = d3.pack<BubbleChartDatum<T>>()
    .size([width.value, height.value])
    .padding(props.padding)

  const root = pack(
    d3.hierarchy({ children: props.data } as BubbleChartDatum<T>).sum(d => getValue(d)),
  )

  const svg = d3.select(chart.value)

  // clear children to re-draw chart bubbles
  svg.selectChildren().remove()

  const node = svg.append('g')
    .selectAll()
    .data(root.leaves())
    .join('g')
    .attr('transform', d => `translate(${d.x}, ${d.y})`)

  node.append('circle')
    .attr('class', 'tw-cursor-pointer tw-fill-accent-r2 tw-stroke-accent-r1 tw-stroke tw-duration-300 hover:tw-stroke-accent-r0 tw-opacity-muted hover:tw-opacity-soft')
    .attr('r', d => d.r)
    .on('mouseover', (_, d) => {
      highlightedData.value = d.data
    })
    .on('mouseout', () => {
      highlightedData.value = null
    })
    .on('click', (_, d) => {
      copy(d.data.name)
    })

  const text = node.append('text')
    .attr('clip-path', d => `circle(${d.r})`)
    .attr('class', 'tw-hidden tw-fill-accent-r0 sm:tw-inline tw-pointer-events-none')
    .text(d => getLabel(d.data))
    .attr('y', '0.25em')

  text.selectAll()
    .data(d => `${d.value}`)
    .join('tspan')
}, { debounce: 100 })
</script>
