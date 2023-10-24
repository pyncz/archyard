/**
 * Return color with applied opacity
 */
export const c = (color: string, opacityValue?: string | number) => {
  return opacityValue === undefined
    ? `rgb(var(${color}))`
    : `rgb(var(${color}) / ${opacityValue})`
}

/**
 * Return getter of color by the applied opacity
 */
export const co = (color: string) => {
  return c(color, '<alpha-value>')
}
