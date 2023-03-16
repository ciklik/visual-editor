import React, { CSSProperties, SyntheticEvent } from 'react'
import styled from '@emotion/styled'
import { UnstyledButton } from 'src/components/ui'

type PreviewAddFloatingProps = {
  onClick?: (e: SyntheticEvent) => void,
  style?: CSSProperties
}

export function PreviewAddFloating({ onClick, style }: PreviewAddFloatingProps) {
  return (
    <Button onClick={onClick} style={style}>
      <span>Ajouter un bloc</span>
    </Button>
  )
}

const Button = styled(UnstyledButton)({
  position: 'relative',
  marginTop: '-40px',
  marginBottom: '-40px',
  opacity: 0,
  width: '100%',
  height: '80px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 101,
  backgroundColor: 'transparent',
  border: 'none',
  transition: 'opacity .3s',
  '&:hover': { opacity: 1 },
  '&::before': {
    content: "''",
    height: '2px',
    width: '100%',
    position: 'absolute',
    top: 'calc(50% - 1px)',
    left: '0',
    zIndex: 101,
    backgroundColor: 'var(--ve-primary)',
  },
  '&::after': {
    content: "'+'",
    fontSize: '1.5em',
    zIndex: 101,
    width: '40px',
    height: '40px',
    background: 'var(--ve-primary)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFF',
    borderRadius: '40px',
    transition: 'transform .3s',
  },
  '& span': {
    pointerEvents: 'none',
    fontSize: '15px',
    height: '34px',
    background: 'var(--ve-primary)',
    padding: '0 .5em',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    left: '50%',
    bottom: '-30px',
    transform: 'translate(-50%, 5px)',
    color: '#FFF',
    transition: 'transform .3s',
    '&::before': {
      content: "''",
      position: 'absolute',
      display: 'block',
      left: 'calc(50% - 6px)',
      top: '-6px',
      width: '12px',
      height: '12px',
      background: 'var(--bs-primary)',
      transform: 'rotate(45deg)',
    },
  },
  '&:hover span': { transform: 'translate(-50%, 0px)' },
})
