import { EditorComponentData } from 'src/types'
import React, { useEffect, useRef } from 'react'
import { usePreview } from 'src/hooks/usePreview'
import { useFieldFocused, useSetFocusIndex } from 'src/store'
import { offsetTop } from 'src/functions/dom'
import { Flipped } from 'react-flip-toolkit'
import { Spinner } from 'src/components/ui/Spinner'
import styled from '@emotion/styled'

type PreviewItemProps = {
  data: EditorComponentData
  initialHTML: string
  previewUrl: string
  title: string
}

export function PreviewItem({
  data,
  initialHTML,
  previewUrl,
  title,
}: PreviewItemProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { loading, html } = usePreview(data, previewUrl, initialHTML)
  const setFocusIndex = useSetFocusIndex()
  const isFocused = useFieldFocused(data._id)

  useEffect(() => {
    if (isFocused) {
      const top = offsetTop(ref.current!) - 40
      const root = ref.current!.closest('html')!
      root.scrollTop = top
    }
  }, [isFocused])

  return (
    <Flipped flipId={data._id}>
      <Wrapper
        id={`previewItem${data._id}`}
        isFocused={isFocused}
        ref={ref}
        onClick={() => setFocusIndex(data._id)}
      >
        {loading && <StyledSpinner size={12} />}
        <Title isFocused={isFocused}>{title}</Title>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Wrapper>
    </Flipped>
  )
}

const Wrapper = styled.div<{ isFocused: boolean }>(
  {
    position: 'relative',
    cursor: 'pointer',
    '&:hover': {
      borderColor: 'var(--ve-primary)',
    },
    '&::before': {
      content: "''",
      position: 'absolute',
      inset: 0,
      borderStyle: 'solid',
      borderColor: 'transparent',
      zIndex: 10,
    },
    '&:hover::before': {
      borderColor: 'var(--ve-primary)',
    },
  },
  ({ isFocused }) => ({
    '&::before': {
      borderWidth: isFocused ? 2 : 1,
      borderColor: isFocused ? 'var(--ve-primary)' : 'transparent',
    },
  })
)

const Title = styled.div<{ isFocused: boolean }>(
  {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'var(--ve-primary)',
    color: '#FFF',
    padding: '.2rem .4rem',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    opacity: 0,
    transform: 'translateY(calc(1px - 100%))',
    '*:hover > &': {
      opacity: 1,
    },
  },
  ({ isFocused }) => ({
    opacity: isFocused ? 1 : 0,
  })
)

const StyledSpinner = styled(Spinner)({
  top: '1rem',
  right: '1rem',
  left: 'auto',
  bottom: 'auto',
  color: 'var(--ve-primary)',
})
