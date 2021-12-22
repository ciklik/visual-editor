import { useEffect, useRef } from 'react'

export function useUpdateEffect(cb: Function, deps: any[]): void {
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    return cb()
  }, deps)
}
