import { useEffect } from 'react'
import { indexify } from 'src/functions/object'
import { usePartialStore } from 'src/store'

export function useClipboardPaste(enabled: boolean) {
  const { insertData } = usePartialStore('insertData')
  useEffect(() => {
    if (!enabled) {
      return
    }
    const listener = (event: ClipboardEvent) => {
      try {
        let paste = (event.clipboardData || window.clipboardData)
          .getData('text')
          .trim()
        if (paste.startsWith('{')) {
          event.preventDefault()
          const data = JSON.parse(paste)
          if (data._name) {
            insertData(data._name, 0, indexify(data))
          }
        } else if (paste.startsWith('[')) {
          event.preventDefault()
          const data = JSON.parse(paste)
          if (data.length > 0) {
            for (let i = data.length - 1; i >= 0; i--) {
              insertData(data[i]._name, 0, indexify(data[i]))
            }
          }
        }
      } catch (e) {}
    }
    document.addEventListener('paste', listener)
    return () => {
      document.removeEventListener('paste', listener)
    }
  }, [insertData, enabled])
}
