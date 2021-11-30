import { EditorComponentData } from 'src/types'
import { useRef, useState } from 'react'
import { useEffectDebounced } from './useEffectDebounced'

export function usePreview(
  data: EditorComponentData,
  previewUrl: string,
  initialHTML: string
): { loading: boolean; html: string } {
  const [loading, setLoading] = useState(false)
  const [html, setHTML] = useState(initialHTML)
  const isFirstRender = useRef(!!initialHTML)

  useEffectDebounced(
    () => {
      if (isFirstRender.current) {
        isFirstRender.current = false
        return
      }
      const timer = window.setTimeout(() => setLoading(true), 200)
      fetch(previewUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ ...data, preview: true }),
      })
        .then((r) => r.text())
        .then(setHTML)
        .finally(() => {
          clearTimeout(timer)
          setLoading(false)
        })
      return () => clearTimeout(timer)
    },
    [data],
    500
  )
  return {
    loading,
    html,
  }
}
