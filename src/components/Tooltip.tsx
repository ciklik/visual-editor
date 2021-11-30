import React, { ReactElement, ReactNode } from 'react'
import Tippy, { TippyProps } from '@tippyjs/react'

type TooltipProps = {
  content: ReactNode
  children: ReactElement
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
    <Tippy content={content} visible={visible} {...tippyProps}>
      {children}
    </Tippy>
  )
}

