import { EditorComponentData } from 'src/types'
import { useEffect, useRef, useState } from 'preact/hooks'
import { createPortal } from 'preact/compat'
import { useAsyncEffect } from 'src/hooks/useAsyncEffect'
import { usePreview } from 'src/hooks/usePreview'
import clsx from 'clsx'
import {
  PreviewModes,
  useFieldDefinitions,
  useFieldFocused,
  useInsertData,
  usePreviewMode,
  useSetFocusIndex,
} from 'src/store'
import { Flipped, Flipper } from 'react-flip-toolkit'
import { useWindowSize } from 'react-use'
import { PHONE_HEIGHT } from 'src/constants'
import { prevent } from 'src/functions/functions'
import { BlocList } from './Blocs/BlocList'
import { fillDefaults } from 'src/functions/fields'
import { BlocAdder } from './Blocs/BlocAdder'
import { Button } from './ui/Button'
import { IconCirclePlus } from './Icons'

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
      (acc, v, k) => ({ ...acc, [data[k]._id]: v.outerHTML }),
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
      class={clsx(
        've-preview',
        previewMode === PreviewModes.PHONE && 've-preview-phone'
      )}
    >
      <iframe ref={iframe} style={transform} />
      {iframeRoot &&
        createPortal(
          <PreviewItems
            data={data}
            initialHTML={initialHTML.current}
            previewUrl={previewUrl}
            iconsUrl={iconsUrl}
          />,
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
  iconsUrl,
}: {
  data: EditorComponentData[]
  initialHTML: Record<string, string>
  previewUrl: string
  iconsUrl: string
}) {
  const [blocsIndex, setBlocsIndex] = useState<number | null>(null)
  const insertData = useInsertData()
  const definitions = useFieldDefinitions()
  const handleAddBloc = (blocName: string, index: number) => {
    insertData(
      blocName,
      index + 1,
      fillDefaults({}, definitions[blocName].fields)
    )
    setBlocsIndex(null)
  }

  return (
    <>
      <Flipper flipKey={data.map((d) => d._id).join('_')}>
        {data.map((v, k) => (
          <div key={v._id}>
            <BlocAdder
              onToggle={() =>
                setBlocsIndex((i) => (i === k - 1 ? null : k - 1))
              }
              showBlocs={blocsIndex === k - 1}
              iconsUrl={iconsUrl}
              onAddBloc={(name: string) => handleAddBloc(name, k - 1)}
            />
            <PreviewItem
              title={definitions[v._name]?.title}
              data={v}
              initialHTML={initialHTML[v._id]}
              previewUrl={previewUrl}
            />
          </div>
        ))}
      </Flipper>
      {blocsIndex !== data.length - 1 ? (
        <div class="ve-preview-new-bloc">
          <Button icon={IconCirclePlus} onClick={prevent(() => setBlocsIndex(data.length - 1))}>
            Ajouter un bloc
          </Button>
        </div>
      ) : (
        <BlocList
          iconsUrl={iconsUrl}
          onAddBloc={(name: string) => handleAddBloc(name, data.length - 1)}
        />
      )}
    </>
  )
}

/**
 * Gère le rendu de chaque composant
 */
export function PreviewItem({
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
      <div class="ve-preview-wrapper" id={`previewItem${data._id}`}>
        <div
          class={clsx(
            've-preview-component',
            loading && 'is-loading',
            isFocused && 'is-focused'
          )}
          ref={ref}
          onClick={() => setFocusIndex(data._id)}
        >
          <div class="ve-preview-label">{title}</div>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </Flipped>
  )
}

/**
 * Gère le rendu de chaque composant
 */
export function PreviewItemPlaceholder() {
  return (
    <div class={clsx('ve-preview-placeholder')} id="previewItemstart">
      <div class="ve-preview-droppable-top" />
      Déposer votre premier bloc ici
    </div>
  )
}
