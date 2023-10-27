<template>
  <div ref="viewportRef">
    <slot v-bind="{ highlightedData }" />
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

<script setup lang="ts">
import { useElementSize, watchDebounced } from '@vueuse/core'
import * as d3 from 'd3'

interface BubbleChartNode {
  name: string
  value: number
}

interface BubbleChartDatum {
  value?: number
  name?: string
  children?: BubbleChartNode[]
}

interface Props {
  padding?: number
  data: BubbleChartNode[]
}

const props = withDefaults(defineProps<Props>(), {
  padding: 5,
})

const chart = ref<SVGElement | null>(null)
const viewportRef = ref<HTMLDivElement | null>(null)
const { width, height } = useElementSize(viewportRef)

const color = d3.scaleOrdinal(d3.schemeTableau10)
const highlightedData = ref<BubbleChartDatum | null>(null)

watchDebounced([width, height, viewportRef, chart, () => props.data, () => props.padding], () => {
  if (!width.value || !height.value || !viewportRef.value || !chart.value) {
    return
  }

  const pack = d3.pack<BubbleChartDatum>()
    .size([width.value, height.value])
    .padding(props.padding)

  const root = pack(
    d3.hierarchy<BubbleChartDatum>({ children: props.data }).sum(d => d.value ?? 0),
  )

  const svg = d3.select(chart.value)

  // clear children to re-draw chart bubbles
  svg.selectChildren().remove()

  const node = svg.append('g')
    .selectAll()
    .data(root.leaves())
    .join('g')
    .attr('class', 'bubble')
    .attr('transform', d => `translate(${d.x}, ${d.y})`)

  node.append('circle')
    .attr('class', 'tw-stroke-accent/0 tw-stroke-2 tw-duration-100 hover:tw-stroke-accent')
    .attr('fill', d => color(d.data.name ?? ''))
    .attr('r', d => d.r)
    .on('mouseover', (_, d) => {
      highlightedData.value = d.data
    })
    .on('mouseout', () => {
      highlightedData.value = null
    })

  const text = node.append('text')
    .attr('clip-path', d => `circle(${d.r})`)
    .attr('title', d => d.data.name ?? '')

  text.selectAll()
    .data(d => `${d.value}`)
    .join('tspan')
    .attr('class', 'tw-hidden xs:tw-inline')
    .attr('x', 0)
    .attr('y', (_, i, nodes) => `${i - nodes.length / 2 + 0.5}em`)
    .text(d => d)
}, { debounce: 100 })
</script>
