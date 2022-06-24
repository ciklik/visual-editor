import { EditorComponentData } from 'src/types'
import React, { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useAsyncEffect } from 'src/hooks/useAsyncEffect'
import { PreviewModes, usePreviewMode } from 'src/store'
import { useWindowSize } from 'react-use'
import { PHONE_HEIGHT } from 'src/constants'
import { Spinner } from 'src/components/ui'
import { FrameProvider } from 'src/components/Preview/FrameProvider'
import { BaseStyles } from 'src/components/BaseStyles'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import { PreviewItems } from 'src/components/Preview/PreviewItems'

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
  const [loaded, setLoaded] = useState(false)
  const showSpinner = !loaded

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
    try {
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
    } catch (e) {
      return
    }
  }, [])

  const previewMode = usePreviewMode()
  const { height: windowHeight } = useWindowSize()
  let transform = undefined

  if (previewMode === PreviewModes.PHONE && windowHeight < 844) {
    transform = { transform: `scale(${windowHeight / PHONE_HEIGHT})` }
  }

  return (
    <PreviewWrapper>
      {showSpinner && <Spinner css={{ color: 'white', opacity: 0.6 }} />}
      <StyledIframe
        loaded={loaded}
        mobile={previewMode === PreviewModes.PHONE}
        ref={iframe}
        style={transform}
        onLoad={() => setLoaded(true)}
      />
      {iframeRoot &&
        createPortal(
          <FrameProvider container={iframe.current!.contentDocument!}>
            <BaseStyles complete={false}>
              <PreviewItems
                data={data}
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

const Out = keyframes({
  from: { transform: 'translateX(0)', opacity: 1 },
  to: { transform: 'translateX(50px)', opacity: 0 },
})

const In = keyframes({
  from: { transform: 'translateX(50px)', opacity: 0 },
  to: { transform: 'translateX(0)', opacity: 1 },
})

const PreviewWrapper = styled.div({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  animation: `${In} .7s cubic-bezier(0.19, 1, 0.22, 1) both`,
  '[hidden="hidden"] &': {
    animationName: `${Out}`,
  },
})

const StyledIframe = styled.iframe<{ loaded: boolean; mobile: boolean }>(
  {
    transformOrigin: '50% 50%',
    border: 'none',
    color: 'var(--ve-primary)',
    transition: 'width .3s, height .3s, opacity .5s',
  },
  (props) => ({
    opacity: props.loaded ? 1 : 0,
    width: props.mobile ? '390px' : '100%',
    height: props.mobile ? '844px' : '100%',
  })
)
