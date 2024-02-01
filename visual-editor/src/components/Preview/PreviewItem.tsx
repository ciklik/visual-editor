import { EditorComponentData } from 'src/types'
import React, { useEffect, useRef } from 'react'
import { usePreview } from 'src/hooks/usePreview'
import { useFieldFocused, useSetBlockIndex, useSetFocusIndex } from 'src/store'
import { offsetTop } from 'src/functions/dom'
import { Flipped } from 'react-flip-toolkit'
import { Spinner } from 'src/components/ui'
import styled from '@emotion/styled'
import { PreviewItemWrapper } from 'src/components/Preview/PreviewItemWrapper'
import { prevent } from 'src/functions/functions'

type PreviewItemProps = {
  data: EditorComponentData
  initialHTML: string
  previewUrl: string
  title: string
  index: number
}

export function PreviewItem({
  index,
  data,
  initialHTML,
  previewUrl,
  title,
}: PreviewItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { loading, html } = usePreview(data, previewUrl, initialHTML)
  const setFocusIndex = useSetFocusIndex()
  const isFocused = useFieldFocused(data._id)
  const setAddBlockIndex = useSetBlockIndex()

  useEffect(() => {
    if (isFocused) {
      const top = offsetTop(ref.current!) - 40
      const root = ref.current!.closest('html')!
      root.scrollTop = top
    }
  }, [isFocused])

  return (
    <Flipped flipId={data._id}>
      <PreviewItemWrapper
        title={title}
        id={`previewItem${data._id}`}
        isFocused={isFocused}
        ref={ref}
        onClick={() => setFocusIndex(data._id)}
        onAdd={prevent(() => setAddBlockIndex(index))}
      >
        {loading && <StyledSpinner size={12} />}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </PreviewItemWrapper>
    </Flipped>
  )
}

const StyledSpinner = styled(Spinner)({
  top: '1rem',
  right: '1rem',
  left: 'auto',
  bottom: 'auto',
  color: 'var(--ve-primary)',
})
