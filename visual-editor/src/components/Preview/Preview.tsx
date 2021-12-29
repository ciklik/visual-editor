import { EditorComponentData } from 'src/types'
import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAsyncEffect } from 'src/hooks/useAsyncEffect'
import clsx from 'clsx'
import {
  PreviewModes,
  useFieldDefinitions,
  usePreviewMode,
  useSetBlockIndex,
} from 'src/store'
import { Flipper } from 'react-flip-toolkit'
import { useWindowSize } from 'react-use'
import { PHONE_HEIGHT } from 'src/constants'
import Styles from '../Preview.module.scss'
import { useToggle } from 'src/hooks/useToggle'
import { Spinner } from 'src/components/ui/Spinner'
import { FrameProvider } from 'src/components/Preview/FrameProvider'
import { PreviewItem } from 'src/components/Preview/PreviewItem'
import { PreviewAddButton } from 'src/components/Preview/PreviewAddButton'
import { PreviewAddFloating } from 'src/components/Preview/PreviewAddFloating'

type PreviewProps = {
  data: EditorComponentData[]
  previewUrl: string
  iconsUrl: string
}

/**
 * Affiche un aperçu du rendu de la page dans une iframe
 */
export function Preview({ data, previewUrl, iconsUrl }: PreviewProps) {
  const iframe = useRef<HTMLIFrameElement>(null)
  const [iframeRoot, setIframeRoot] = useState<HTMLElement | null>(null)
  const initialHTML = useRef<Record<string, string>>({})
  const [loaded, toggleLoaded] = useToggle()

  // Gère le chargement de la preview initiale
  useAsyncEffect(async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000))
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
    const iframeDocument = iframe.current!.contentDocument!
    iframeDocument.open()
    iframeDocument.write(await r.text())
    iframeDocument.close()
    const root = iframeDocument.querySelector('#ve-components') as HTMLElement
    initialHTML.current = Array.from(root.children).reduce(
      (acc, v, k) => ({ ...acc, [data[k]!._id]: v.outerHTML }),
      {}
    )
    root.innerHTML = ''
    setIframeRoot(root)
  }, [])

  const previewMode = usePreviewMode()
  const { height: windowHeight } = useWindowSize()
  let transform = undefined

  if (previewMode === PreviewModes.PHONE && windowHeight < 844) {
    transform = { transform: `scale(${windowHeight / PHONE_HEIGHT})` }
  }

  return (
    <div
      className={clsx(
        Styles.Preview,
        loaded && Styles.PreviewLoaded,
        previewMode === PreviewModes.PHONE && Styles.PreviewPhone
      )}
    >
      <Spinner css={{ color: 'white', opacity: 0.6 }} />
      <iframe ref={iframe} style={transform} onLoad={toggleLoaded} />
      {iframeRoot &&
        createPortal(
          <FrameProvider container={iframe.current!.contentDocument!}>
            <PreviewItems
              data={data}
              initialHTML={initialHTML.current}
              previewUrl={previewUrl}
            />
          </FrameProvider>,
          iframeRoot
        )}
    </div>
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
  const definitions = useFieldDefinitions()
  const setAddBlockIndex = useSetBlockIndex()

  return (
    <>
      <Flipper flipKey={data.map((d) => d._id).join('_')}>
        {data.map((v, k) => (
          <div key={v._id}>
            <PreviewAddFloating position={k} />
            <PreviewItem
              title={definitions[v._name]?.title || ''}
              data={v}
              initialHTML={initialHTML[v._id] || ''}
              previewUrl={previewUrl}
            />
          </div>
        ))}
      </Flipper>
      <PreviewAddButton position={data.length} />
    </>
  )
}
