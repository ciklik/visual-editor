/**
 * Convert a color into a CSS property
 *
 * For instance:
 * ```
 * colorToProperty('#FF0000') // #FF0000
 * colorToProperty('blue') // var(--blue)
 * ```
 */
export declare function colorToProperty(color: string | undefined): string | undefined;
