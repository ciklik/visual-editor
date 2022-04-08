/**
 * Convert a color into a CSS property
 *
 * For instance:
 * ```
 * colorToProperty('#FF0000') // #FF0000
 * colorToProperty('blue') // var(--blue)
 * ```
 */
export function colorToProperty(color: string | undefined) {
  if (typeof color !== 'string') {
    return undefined
  }
  if (color.startsWith('--')) {
    return `var(${color})`
  }
  return color
}
