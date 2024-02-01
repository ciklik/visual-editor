import React, {
  CSSProperties,
  forwardRef,
  PropsWithChildren,
  SyntheticEvent,
} from 'react'
import styled from '@emotion/styled'
import { PreviewAddFloating } from 'src/components/Preview/PreviewAddFloating'
import { IconTrash } from 'src/components/ui'

type Props = {
  title?: string
  isFocused: boolean
  style?: CSSProperties
  onClick: (e: SyntheticEvent) => void
  onAdd: (e: SyntheticEvent) => void
  onDelete: (e: SyntheticEvent) => void
  id?: string
}

export const PreviewItemWrapper = forwardRef<HTMLDivElement, Props>(
  ({ title, isFocused, style, onClick, onAdd, onDelete }, ref) => {
    const handleAdd = (e: SyntheticEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onAdd(e)
    }
    const handleDelete = (e: SyntheticEvent) => {
      e.preventDefault()
      e.stopPropagation()
      onDelete(e)
    }
    return (
      <PreviewItemWrapperDiv
        isFocused={isFocused}
        ref={ref}
        style={style}
        onClick={onClick}
      >
        <PreviewAddFloating onClick={handleAdd} />
        {title && (
          <PreviewItemTitle isFocused={isFocused}>{title}</PreviewItemTitle>
        )}
        <PreviewItemHeader isFocused={isFocused}>
          <PreviewButton
            onClick={handleDelete}
            style={{
              backgroundColor: 'var(--ve-danger)',
              marginLeft: 'auto',
            }}
          >
            <IconTrash size={16} />
          </PreviewButton>
        </PreviewItemHeader>
      </PreviewItemWrapperDiv>
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
    top: -1,
    right: 0,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 2,
    color: '#FFF',
    opacity: 0,
    paddingRight: '.5rem',
    transform: 'translateY(calc(1px - 100%))',
    zIndex: 102,
    transition: '.3s',
    '*:hover > &': {
      opacity: 1,
    },
  },
  ({ isFocused }) => ({
    opacity: isFocused ? 1 : 0,
  })
)

const PreviewButton = styled.button({
  color: '#FFF',
  border: 'none',
  backgroundColor: 'var(--ve-primary)',
  height: 30,
  display: 'flex',
  alignItems: 'center',
  paddingInline: '.4rem',
  borderTopLeftRadius: '5px',
  borderTopRightRadius: '5px',
  transition: '.3s',
  transformOrigin: '0 0',
  '&:hover': {
    height: 36,
  },
})

const PreviewItemTitle = styled.div<{ isFocused: boolean }>(
  {
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0,
    color: '#FFF',
    backgroundColor: 'var(--ve-primary)',
    height: 30,
    display: 'flex',
    alignItems: 'center',
    paddingInline: '.4rem',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    transform: 'translateY(calc(1px - 100%))',
    '*:hover > &': {
      opacity: 1,
    },
  },
  ({ isFocused }) => ({
    opacity: isFocused ? 1 : 0,
  })
)
