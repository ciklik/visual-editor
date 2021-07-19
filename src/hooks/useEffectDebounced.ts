import { useEffect, useMemo, useRef } from 'preact/hooks'
import { debounce } from '../functions/time'

export function useEffectDebounced(
  callback: Function,
  deps: any[],
  time: number
) {
  const callbackRef = useRef<Function>(callback)
  const debouncedCallback = useMemo(() => {
    return debounce((...args: any[]) => callbackRef.current(...args), time)
  }, [])
  callbackRef.current = callback

  useEffect(() => {
    debouncedCallback()
  }, deps)
}
