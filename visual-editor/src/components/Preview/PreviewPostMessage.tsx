import type { PreviewProps } from 'src/components/Preview/Preview'
import { useEffect, useRef, useState } from 'react'
import { PreviewWrapper, StyledIframe } from 'src/components/Preview/Preview'
import {
  PreviewModes,
  useFocusIndex,
  usePreviewMode,
  useSetBlockIndex,
  useSetFocusIndex,
} from 'src/store'
import { useWindowSize } from 'react-use'
import { PHONE_HEIGHT } from 'src/constants'
import { EditorComponentData } from 'src/types'

type IframeEvents =
  | {
      type: 've-focus'
      payload: { id: string }
    }
  | {
      type: 've-add'
      payload: { id: string }
    }

export type EditorMessageEvents =
  | {
      type: 've-focus'
      payload: { id: string }
    }
  | {
      type: 've-data'
      payload: EditorComponentData[]
    }

/**
 * Alternative preview component based on postMessage to communicate using
 * cross domain
 */
export function PreviewPostMessage({ data, previewUrl }: PreviewProps) {
  const iframe = useRef<HTMLIFrameElement>(null)
  const [loaded, setLoaded] = useState(false)
  const previewMode = usePreviewMode()
  const { height: windowHeight } = useWindowSize()
  let transform = undefined
  const setFocusIndex = useSetFocusIndex()
  const setAddBlockIndex = useSetBlockIndex()
  const focusIndex = useFocusIndex()
  const previewUrlRef = useRef(previewUrl)
  previewUrlRef.current = previewUrl

  if (previewMode === PreviewModes.PHONE && windowHeight < 844) {
    transform = { transform: `scale(${windowHeight / PHONE_HEIGHT})` }
  }

  useEffect(() => {
    const listener = (e: MessageEvent<IframeEvents>) => {
      if (e.data.type === 've-focus') {
        setFocusIndex(e.data.payload.id)
      } else if (e.data.type === 've-add') {
        console.log({ id: e.data.payload.id })
        setAddBlockIndex(e.data.payload.id)
      }
    }
    window.addEventListener('message', listener)
    return () => {
      window.removeEventListener('message', listener)
    }
  }, [])

  useEffect(() => {
    if (loaded && iframe.current && iframe.current.contentWindow) {
      iframe.current.contentWindow.postMessage(
        {
          type: 've-data',
          payload: data,
        },
        previewUrlRef.current
      )
    }
  }, [loaded, data])

  useEffect(() => {
    if (iframe.current && iframe.current.contentWindow) {
      iframe.current.contentWindow.postMessage(
        {
          type: 've-focus',
          payload: { id: focusIndex },
        },
        previewUrlRef.current
      )
    }
  }, [focusIndex])

  const previewURLWithReferrer = new URL(previewUrl)
  previewURLWithReferrer.searchParams.set(
    'referrer',
    window.location.toString()
  )

  return (
    <PreviewWrapper>
      <StyledIframe
        ref={iframe}
        src={previewURLWithReferrer.toString()}
        loaded={loaded}
        mobile={previewMode === PreviewModes.PHONE}
        style={transform}
        onLoad={() => setLoaded(true)}
      />
    </PreviewWrapper>
  )
}
