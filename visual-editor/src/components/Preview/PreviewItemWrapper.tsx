import React, {
  CSSProperties,
  forwardRef,
  PropsWithChildren,
  SyntheticEvent,
} from 'react'
import styled from '@emotion/styled'
import { PreviewAddFloating } from 'src/components/Preview/PreviewAddFloating'

type Props = PropsWithChildren<{
  title?: string
  isFocused: boolean
  style?: CSSProperties
  onClick: (e: SyntheticEvent) => void
  onAdd?: (e: SyntheticEvent) => void
  id?: string
}>

export const PreviewItemWrapper = forwardRef<HTMLDivElement, Props>(
  ({ title, isFocused, style, onClick, onAdd, children }, ref) => {
    return (
      <>
        {children}
        <PreviewAddFloating onClick={onAdd} />
        <PreviewItemWrapperDiv
          isFocused={isFocused}
          ref={ref}
          style={style}
          onClick={onClick}
        >
          <PreviewItemHeader isFocused={isFocused}>
            {title && <PreviewItemTitle>{title}</PreviewItemTitle>}
          </PreviewItemHeader>
        </PreviewItemWrapperDiv>
      </>
    )
  }
)

const PreviewItemWrapperDiv = styled.div<{ isFocused: boolean }>(
  {
    position: 'absolute',
    inset: 0,
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

const PreviewItemHeader = styled.div<{ isFocused: boolean }>(
  {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    gap: 2,
    color: '#FFF',
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

const PreviewItemTitle = styled.div({
  color: '#FFF',
  backgroundColor: 'var(--ve-primary)',
  padding: '.2rem .4rem',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
})
