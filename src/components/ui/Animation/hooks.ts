import sync from 'framesync'
import { useState, useCallback, useRef, useEffect } from 'react'

export function useUnmountEffect(callback: () => void) {
  return useEffect(() => () => callback(), [])
}

export function useForceUpdate(): [VoidFunction, number] {
  const isUnmountingRef = useRef(false)
  const [forcedRenderCount, setForcedRenderCount] = useState(0)
  useUnmountEffect(() => (isUnmountingRef.current = true))

  const forceRender = useCallback(() => {
    !isUnmountingRef.current && setForcedRenderCount(forcedRenderCount + 1)
  }, [forcedRenderCount])

  /**
   * Defer this to the end of the next animation frame in case there are multiple
   * synchronous calls.
   */
  const deferredForceRender = useCallback(
    () => sync.postRender(forceRender),
    [forceRender]
  )

  return [deferredForceRender, forcedRenderCount]
}

type Init<T> = () => T

/**
 * Creates a constant value over the lifecycle of a component.
 *
 * Even if `useMemo` is provided an empty array as its final argument, it doesn't offer
 * a guarantee that it won't re-run for performance reasons later on. By using `useConstant`
 * you can ensure that initialisers don't execute twice or more.
 */
export function useConstant<T>(init: Init<T>) {
  const ref = useRef<T | null>(null)

  if (ref.current === null) {
    ref.current = init()
  }

  return ref.current
}
