import { useInsertData } from 'src/store'
import { useEffect } from 'preact/hooks'
import { indexify } from 'src/functions/object'

export function useClipboardPaste() {
  const insertData = useInsertData()
  useEffect(() => {
    const listener = (event: ClipboardEvent) => {
      let paste = (event.clipboardData || window.clipboardData)
        .getData('text')
        .trim()
      if (paste.startsWith('{')) {
        event.preventDefault()
        const data = JSON.parse(paste)
        if (data._name) {
          insertData(data._name, 0, indexify(data))
        }
      }
    }
    document.addEventListener('paste', listener)
    return () => {
      document.removeEventListener('paste', listener)
    }
  }, [insertData])
}
