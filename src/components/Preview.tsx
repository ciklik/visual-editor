import { EditorComponentData } from 'src/types'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAsyncEffect } from 'src/hooks/useAsyncEffect'
import { usePreview } from 'src/hooks/usePreview'
import clsx from 'clsx'
import {
  PreviewModes,
  useFieldDefinitions,
  useFieldFocused,
  usePreviewMode,
  useSetBlockIndex,
  useSetFocusIndex,
} from 'src/store'
import { Flipped, Flipper } from 'react-flip-toolkit'
import { useWindowSize } from 'react-use'
import { PHONE_HEIGHT } from 'src/constants'
import { prevent } from 'src/functions/functions'
import { Button } from './ui/Button'
import { IconCirclePlus } from './ui/Icons'
import Styles from './Preview.module.scss'

type PreviewProps = {
  data: EditorComponentData[]
  previewUrl: string
  iconsUrl: string
}

/**
 * Affiche un aperçu du rendu de la page dans une iframe
 */
export function Preview ({ data, previewUrl, iconsUrl }: PreviewProps) {
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
    const iframeDocument = iframe.current!.contentDocument!
    iframeDocument.open()
    iframeDocument.write(await r.text())
    iframeDocument.close()
    const root = iframeDocument.querySelector('#ve-components') as HTMLElement
    initialHTML.current = Array.from(root.children).reduce(
      (acc, v, k) => ({ ...acc, [data[k]!._id]: v.outerHTML }),
      {},
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
        previewMode === PreviewModes.PHONE && Styles.PreviewPhone,
      )}
    >
      <iframe ref={iframe} style={transform} />
      {iframeRoot &&
      createPortal(
        <PreviewItems
          data={data}
          initialHTML={initialHTML.current}
          previewUrl={previewUrl}
        />,
        iframeRoot,
      )}
    </div>
  )
}

/**
 * Gère le rendu dans l'iframe des différents composants
 */
export function PreviewItems ({
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
            <button
              className={Styles.PreviewAddButton}
              onClick={prevent(() => setAddBlockIndex(k))}
            />
            <PreviewItem
              title={definitions[v._name]?.title || ''}
              data={v}
              initialHTML={initialHTML[v._id] || ''}
              previewUrl={previewUrl}
            />
          </div>
        ))}
      </Flipper>
      <div className={Styles.PreviewAddBlock}>
        <Button icon={IconCirclePlus} onClick={prevent(() => setAddBlockIndex(data.length))}>
          Ajouter un bloc
        </Button>
      </div>
    </>
  )
}

/**
 * Gère le rendu de chaque composant
 */
export function PreviewItem ({
                               data,
                               initialHTML,
                               previewUrl,
                               title,
                             }: {
  data: EditorComponentData
  initialHTML: string
  previewUrl: string
  title: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { loading, html } = usePreview(data, previewUrl, initialHTML)
  const setFocusIndex = useSetFocusIndex()
  const isFocused = useFieldFocused(data._id)

  useEffect(() => {
    if (isFocused) {
      ref.current!.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [isFocused])

  return (
    <Flipped flipId={data._id}>
      <div className={Styles.PreviewBlockWrapper} id={`previewItem${data._id}`}>
        <div
          className={clsx(
            Styles.PreviewBlock,
            loading && Styles.PreviewBlockLoading,
            isFocused && Styles.PreviewBlockFocused,
          )}
          ref={ref}
          onClick={() => setFocusIndex(data._id)}
        >
          <div className={Styles.PreviewBlockTitle}>{title}</div>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </Flipped>
  )
}

/**
 * Gère le rendu de chaque composant
 */
export function PreviewItemPlaceholder () {
  return (
    <div className={clsx('ve-preview-placeholder')} id='previewItemstart'>
      <div className='ve-preview-droppable-top' />
      Déposer votre premier bloc ici
    </div>
  )
}
