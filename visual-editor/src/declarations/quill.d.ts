import type { RangeStatic, DeltaOperation } from 'quill'

declare module 'quill' {
  export interface KeyboardStatic {
    bindings: Record<
      number,
      {
        key: string | number
        handler: (range: RangeStatic, context: any) => void
        shiftKey?: true
      }[]
    >
  }
  export interface Delta {}
}
