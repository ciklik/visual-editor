import { useLayoutEffect, useState } from 'preact/hooks'

const CLASS_VISIBLE = 'is-visible'
const CLASS_NOT_VISIBLE = 'is-hidden'

/**
 * Renvoie une classe et la visibilité réel de l'élément (utile pour les animations)
 * @param visible
 */
export function useVisibilityClass(visible: boolean): [string, boolean] {
  const [className, setClassName] = useState(
    visible ? CLASS_VISIBLE : CLASS_NOT_VISIBLE
  )
  const [delayedVisible, setDelayedVisible] = useState(visible)
  useLayoutEffect(() => {
    if (visible) {
      setClassName('is-visible')
      setDelayedVisible(true)
    } else {
      setClassName('is-hidden')
      const timer = window.setTimeout(() => setDelayedVisible(false), 700)
      return () => window.clearTimeout(timer)
    }
  }, [visible])

  return [className, delayedVisible]
}
