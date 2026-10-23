import { EditorComponentData } from 'src/types'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useWindowSize } from 'react-use'
import { PHONE_HEIGHT } from 'src/constants'
import { Spinner } from 'src/components/ui'
import { FrameProvider } from 'src/components/Preview/FrameProvider'
import { BaseStyles } from 'src/components/BaseStyles'
import styled from '@emotion/styled'
import { PreviewItems } from 'src/components/Preview/PreviewItems'
import { PreviewWrapper } from 'src/components/Preview/PreviewWrapper'
import { useGetData } from 'src/store'

export type PreviewProps = {
  previewUrl: string
}

/**
 * Affiche un aperçu du rendu de la page dans une iframe
 */
export function Preview({ previewUrl }: PreviewProps) {
  const iframe = useRef<HTMLIFrameElement>(null)
  const [iframeRoot, setIframeRoot] = useState<HTMLElement | null>(null)
  const initialHTML = useRef<Record<string, string>>({})
  const [loaded, setLoaded] = useState(false)
  const showSpinner = !loaded
  const getData = useGetData()

  // Gère le chargement de la preview initiale
  useEffect(() => {
    // The editor can be closed before the preview is loaded
    const controller = new AbortController()
    const load = async () => {
      const data = getData()
      // On génère le premier rendu de la page complète
      const r = await fetch(previewUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal,
      })
      if (!r.ok) {
        return
      }
      const html = await r.text()
      const iframeDocument = iframe.current?.contentDocument
      if (controller.signal.aborted || !iframeDocument) {
        return
      }

      // On écrit le contenu dans l'iframe
      iframeDocument.open()
      iframeDocument.write(html)
      iframeDocument.close()
      const root = iframeDocument.querySelector('#ve-components') as HTMLElement
      initialHTML.current = Array.from(root.children).reduce(
        (acc, v, k) => ({ ...acc, [data[k]!._id]: v.outerHTML }),
        {}
      )
      root.innerHTML = ''
      setIframeRoot(root)
    }
    load().catch((e) => {
      if (!controller.signal.aborted) {
        throw e
      }
    })
    return () => controller.abort()
  }, [])

  return (
    <PreviewWrapper>
      {showSpinner && <Spinner css={{ color: 'white', opacity: 0.6 }} />}
      <StyledIframe
        loaded={loaded}
        ref={iframe}
        onLoad={() => setLoaded(true)}
      />
      {iframeRoot &&
        createPortal(
          <FrameProvider container={iframe.current!.contentDocument!}>
            <BaseStyles complete={false}>
              <PreviewItems
                initialHTML={initialHTML.current}
                previewUrl={previewUrl}
              />
            </BaseStyles>
          </FrameProvider>,
          iframeRoot
        )}
    </PreviewWrapper>
  )
}

export const StyledIframe = styled.iframe<{ loaded: boolean }>(
  {
    transformOrigin: '50% 50%',
    border: 'none',
    color: 'var(--ve-primary)',
    transition: 'opacity .5s',
    width: '100%',
    height: '100%',
  },
  (props) => ({
    opacity: props.loaded ? 1 : 0,
  })
)
