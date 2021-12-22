import { useEffect, useState } from 'react'

/**
 * Delay the visibility change for a component
 */
export function useStateDelayed(
  originalState: boolean,
  duration = 700,
  onlyOnFalse = true
): boolean {
  const [delayedState, setDelayedState] = useState(originalState)
  useEffect(() => {
    if (originalState && onlyOnFalse) {
      setDelayedState(originalState)
    } else {
      const timer = window.setTimeout(() => setDelayedState(originalState), 700)
      return () => window.clearTimeout(timer)
    }
  }, [originalState])

  return delayedState
}
