import type { EventHandler, MouseEventHandler, ReactNode } from 'react'
import { useEffect, useState } from 'react'
import Styles from './Flash.module.scss'
import { Flex } from './Flex'
import { Button } from './Button'
import cx from 'clsx'
import { AnimatePresence } from './Animation/AnimatedPresence'
import { prevent, preventPropagation } from '../../functions/functions'

type FlashProps = {
  children: ReactNode
  action?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  onHide?: EventHandler<any>
  onExit?: Function
  duration?: number
  className?: string
}

export function Flash({
  children,
  action,
  onClick,
  duration,
  onHide,
  className,
}: FlashProps) {
  return (
    <AnimatePresence in={Styles.FlashIn!} out={Styles.FlashOut!}>
      {children && (
        <Flex between className={cx(Styles.Flash, className)}>
          <div>{children}</div>
          {action && (
            <Button
              size="small"
              className={Styles.FlashButton}
              onClick={onClick}
            >
              {action}
            </Button>
          )}
          {duration && (
            <div
              onAnimationEnd={preventPropagation(onHide)}
              className={Styles.FlashProgress}
              style={{ animationDuration: `${duration}s` }}
            />
          )}
        </Flex>
      )}
    </AnimatePresence>
  )
}
