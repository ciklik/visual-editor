import { EditorComponentData } from '../types'
import { useEffect, useRef, useState } from 'preact/hooks'
import { createPortal } from 'preact/compat'
import { useAsyncEffect } from '../hooks/useAsyncEffect'
import { iframeStyle } from '../css/iframe'
import { usePreview } from '../hooks/usePreview'
import clsx from 'clsx'
import { useFocusComponent } from '../hooks/useFocusComponent'
import { useDroppable } from '@dnd-kit/core'

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
  const initialHTML = useRef<Record<string, string>>({})

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
    const onScroll = () => {
      iframeDocument.body.style.setProperty(
        '--offsetX',
        iframe.current.offsetLeft + 'px'
      )
      iframeDocument.body.style.setProperty(
        '--offsetY',
        iframeDocument.documentElement.scrollTop * -1 + 'px'
      )
    }
    onScroll()
    iframeDocument.addEventListener('scroll', onScroll)
    initialHTML.current = Array.from(root.children).reduce(
      (acc, v, k) => ({ ...acc, [data[k]._id]: v.outerHTML }),
      {}
    )
    root.innerHTML = ''
    setIframeRoot(root)
    return () => {
      iframeDocument.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      <iframe ref={iframe} class="ve-preview" />
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
  initialHTML = {},
  previewUrl,
}: {
  data: EditorComponentData[]
  initialHTML: Record<string, string>
  previewUrl: string
}) {
  return (
    <div>
      {data.map((v, k) => (
        <PreviewItem
          data={v}
          initialHTML={initialHTML[v._id]}
          key={v._id}
          index={k}
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
  index,
}: {
  data: EditorComponentData
  initialHTML: string
  previewUrl: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { loading, html } = usePreview(data, previewUrl, initialHTML)
  const [focusedIndex, setIndex] = useFocusComponent()
  const isFocused = focusedIndex === data._id

  useEffect(() => {
    if (isFocused) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [isFocused])

  const { setNodeRef: setNodeRefTop, isOver: isOverTop } = useDroppable({
    id: index.toString() + 'top',
    data: { index },
  })
  const { setNodeRef: setNodeRefBottom, isOver: isOverBottom } = useDroppable({
    id: index.toString() + 'bottom',
    data: { index: index + 1 },
  })
  const isOver = isOverTop || isOverBottom

  return (
    <div style="position:relative">
      <div ref={setNodeRefTop} class="ve-preview-droppable-top" />
      <div ref={setNodeRefBottom} class="ve-preview-droppable-bottom" />
      <div
        class={clsx(
          've-preview-component',
          loading && 'is-loading',
          isOver && 'is-over',
          isOverBottom && 'is-over-bottom',
          isOverTop && 'is-over-top',
          isFocused && 'is-focused'
        )}
        ref={ref}
        onClick={() => setIndex(data._id)}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}
