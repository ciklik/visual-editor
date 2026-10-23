import React, { CSSProperties, SyntheticEvent } from 'react'
import styled from '@emotion/styled'
import { UnstyledButton } from 'src/components/ui'
import { t } from 'src/functions/i18n'

type PreviewAddFloatingProps = {
  onClick?: (e: SyntheticEvent) => void
  style?: CSSProperties
}

export function PreviewAddFloating({
  onClick,
  style,
}: PreviewAddFloatingProps) {
  return (
    <Button onClick={onClick} style={style}>
      <span>{t('addComponent')}</span>
    </Button>
  )
}

const Button = styled(UnstyledButton)({
  position: 'absolute',
  top: 0,
  // The clickable area stays in the middle third, away from the block name
  // (left) and the move / delete buttons (right) that sit on the same edge
  left: '33%',
  right: '33%',
  marginTop: '-40px',
  marginBottom: '-40px',
  opacity: 0,
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
    // The line still spans the whole block (the button is a third of it)
    width: '300%',
    position: 'absolute',
    top: 'calc(50% - 1px)',
    left: '-100%',
    pointerEvents: 'none',
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
