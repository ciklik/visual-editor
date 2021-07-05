import { EditorComponentData } from '../types'
import { useEffect, useRef, useState } from 'preact/hooks'
import { createPortal } from 'preact/compat'
import { useAsyncEffect } from '../hooks/useAsyncEffect'
import { iframeStyle } from '../css/iframe'
import { usePreview } from '../hooks/usePreview'
import clsx from 'clsx'
import { useFocusComponent } from '../hooks/useFocusComponent'

type PreviewProps = {
  data: EditorComponentData[]
  previewUrl: string
}

/**
 * Affiche un aperçu du rendu de la page dans une iframe
 */
export function Preview({ data, previewUrl }: PreviewProps) {
  const iframe = useRef<HTMLIFrameElement>(null)
  const [iframeRoot, setIframeRoot] = useState<HTMLElement | null>(null)
  const initialHTML = useRef<string[]>([])

  useAsyncEffect(async () => {
    // On génère le premier rendu de la page complète
    const r = await fetch(previewUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    })
    if (!r.ok) {
      return
    }

    // On écrit le contenu dans l'iframe
    const iframeDocument = iframe.current.contentDocument!
    iframeDocument.open()
    iframeDocument.write(await r.text())
    iframeDocument.close()
    // On ajoute du style
    const color = getComputedStyle(iframe.current).color
    const style = document.createElement('style')
    style.innerHTML = iframeStyle(color)
    iframeDocument.querySelector('head')!.appendChild(style)
    const root = iframeDocument.querySelector('#ve-components') as HTMLElement
    initialHTML.current = Array.from(root.children).map((v) => v.outerHTML)
    root.innerHTML = ''
    setIframeRoot(root)
  }, [])

  return (
    <>
      <iframe ref={iframe} />
      {iframeRoot &&
        createPortal(
          <PreviewItems
            data={data}
            initialHTML={initialHTML.current}
            previewUrl={previewUrl}
          />,
          iframeRoot
        )}
    </>
  )
}

/**
 * Gère le rendu dans l'iframe des différents composants
 */
export function PreviewItems({
  data,
  initialHTML = [],
  previewUrl,
}: {
  data: EditorComponentData[]
  initialHTML: string[]
  previewUrl: string
}) {
  return (
    <div>
      {data.map((v, k) => (
        <PreviewItem
          data={v}
          initialHTML={initialHTML[k]}
          key={v._index}
          previewUrl={previewUrl}
        />
      ))}
    </div>
  )
}

/**
 * Gère le rendu de chaque composant
 */
export function PreviewItem({
  data,
  initialHTML,
  previewUrl,
}: {
  data: EditorComponentData
  initialHTML: string
  previewUrl: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { loading, html } = usePreview(data, previewUrl, initialHTML)
  const [index, setIndex] = useFocusComponent()
  const isFocused = index === data._index

  useEffect(() => {
    if (isFocused) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [isFocused])

  return (
    <div
      class={clsx(
        've-preview-component',
        loading && 'is-loading',
        isFocused && 'is-focused'
      )}
      ref={ref}
      onClick={() => setIndex(data._index)}
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
