import { EditorComponentData } from 'src/types'
import { useEffect, useRef, useState } from 'preact/hooks'
import { createPortal } from 'preact/compat'
import { useAsyncEffect } from 'src/hooks/useAsyncEffect'
import { iframeStyle } from 'src/css/iframe'
import { usePreview } from 'src/hooks/usePreview'
import clsx from 'clsx'
import { useDroppable } from '@dnd-kit/core'
import { useFieldFocused, useSetFocusIndex } from 'src/store'
import { Flipped, Flipper } from 'react-flip-toolkit'

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

  // Gère le chargement de la preview initiale
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
    <Flipper flipKey={data.map((d) => d._id).join('_')}>
      {data.map((v, k) => (
        <PreviewItem
          data={v}
          initialHTML={initialHTML[v._id]}
          key={v._id}
          index={k}
          previewUrl={previewUrl}
        />
      ))}
    </Flipper>
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
  const setFocusIndex = useSetFocusIndex()
  const isFocused = useFieldFocused(data._id)

  useEffect(() => {
    if (isFocused) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [isFocused])

  const { setNodeRef: setNodeRefTop, isOver: isOverTop } = useDroppable({
    id: data._id.toString() + 'top',
    data: { index },
  })
  const { setNodeRef: setNodeRefBottom, isOver: isOverBottom } = useDroppable({
    id: data._id.toString() + 'bottom',
    data: { index: index + 1 },
  })
  const isOver = isOverTop || isOverBottom

  return (
    <Flipped flipId={data._id}>
      <div class="ve-preview-wrapper" id={`previewItem${data._id}`}>
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
          onClick={() => setFocusIndex(data._id)}
        >
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </Flipped>
  )
}
