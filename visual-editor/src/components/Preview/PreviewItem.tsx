import { EditorComponentData } from 'src/types'
import React, { useEffect, useRef } from 'react'
import { usePreview } from 'src/hooks/usePreview'
import { useFieldFocused, usePartialStore } from 'src/store'
import { offsetTop } from 'src/functions/dom'
import { Flipped } from 'react-flip-toolkit'
import { Spinner } from 'src/components/ui'
import styled from '@emotion/styled'
import { PreviewItemWrapper } from 'src/components/Preview/PreviewItemWrapper'

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
  const isFocused = useFieldFocused(data._id)
  const { removeBloc, setAddBlockIndex, setFocusIndex, moveBloc } =
    usePartialStore(
      'setFocusIndex',
      'setAddBlockIndex',
      'removeBloc',
      'moveBloc'
    )

  useEffect(() => {
    if (isFocused) {
      const top = offsetTop(ref.current!) - 40
      const root = ref.current!.closest('html')!
      root.scrollTop = top
    }
  }, [isFocused])

  return (
    <Flipped flipId={data._id}>
      <div>
        {loading && <StyledSpinner size={12} />}
        <div dangerouslySetInnerHTML={{ __html: html }} />
        <PreviewItemWrapper
          title={title}
          id={`previewItem${data._id}`}
          isFocused={isFocused}
          ref={ref}
          onClick={() => setFocusIndex(data._id)}
          onAdd={() => setAddBlockIndex(index)}
          onDelete={() => removeBloc(data._id)}
          onMove={(direction) => moveBloc(data._id, direction)}
        />
      </div>
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
