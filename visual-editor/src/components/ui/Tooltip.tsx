import React, { ReactElement, ReactNode } from 'react'
import Tippy, { TippyProps } from '@tippyjs/react'
import styled from '@emotion/styled'

type TooltipProps = {
  content: ReactNode
  children: ReactNode
  visible?: boolean
  trigger?: 'click' | 'focus'
}

export function Tooltip({ content, children, visible, trigger }: TooltipProps) {
  const tippyProps: TippyProps = {}
  if (trigger === 'click') {
    tippyProps.trigger = trigger
    tippyProps.hideOnClick = true
    tippyProps.interactive = true
  }

  return (
    <StyledTippy content={content} visible={visible} {...tippyProps}>
      {children as ReactElement}
    </StyledTippy>
  )
}

const StyledTippy = styled(Tippy)({
  backgroundColor: '#202227',
  color: '#FFF',
  padding: '.2em .5em',
  position: 'relative',
  borderRadius: '4px',
  fontSize: '.75em',
  lineHeight: 1.4,
  boxShadow:
    'rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px',
  outline: '0',
  transitionProperty: 'transform, visibility, opacity',
  '&[data-animation=fade][data-state=hidden]': {
    transform: 'translateY(-5px)',
    opacity: 0,
  },
  '&[data-placement^=top] > .tippy-arrow': { bottom: '0' },
  '& .tippy-arrow': {
    width: '16px',
    height: '16px',
    color: '#202227',
  },
  '&[data-placement^=top] > .tippy-arrow::before': {
    bottom: '-7px',
    left: '0',
    borderWidth: '8px 8px 0',
    borderTopColor: 'initial',
    transformOrigin: 'center top',
  },
  '& .tippy-arrow::before': {
    content: '""',
    position: 'absolute',
    borderColor: 'transparent',
    borderStyle: 'solid',
  },
  '&[data-placement^=bottom] > .tippy-arrow::before': {
    top: '-19px',
    left: '0',
    borderWidth: '8px 8px 0',
    borderTopColor: 'initial',
    transform: 'rotate(180deg)',
    transformOrigin: 'center top',
  },
})
