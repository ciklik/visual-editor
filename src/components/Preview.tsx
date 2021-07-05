import { EditorComponentData } from '../types'
import { useEffect, useRef } from 'preact/hooks'
type PreviewProps = {
  data: EditorComponentData[]
  previewUrl: string
}

export function Preview({ data, previewUrl }: PreviewProps) {
  const iframe = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const r = fetch(previewUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    }).then(async (r) => {
      if (r.ok) {
        if (iframe.current.contentDocument) {
          iframe.current.contentDocument.body.innerHTML = await r.text()
        }
      }
    })
  }, [data])

  return <iframe ref={iframe} src={previewUrl} id="ve-preview" />
}
