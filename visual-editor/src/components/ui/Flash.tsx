import type { EventHandler, MouseEventHandler, ReactNode } from 'react'
import { Flex } from './Flex'
import { Button } from './Button'
import { AnimatePresence } from './Animation/AnimatedPresence'
import { prevent, preventPropagation } from 'src/functions/functions'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

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
    <AnimatePresence in={FlashIn} out={FlashOut}>
      {children && (
        <Wrapper between>
          <div>{children}</div>
          {action && (
            <FlashButton size="small" onClick={prevent(onClick)}>
              {action}
            </FlashButton>
          )}
          {duration && (
            <Progress
              onAnimationEnd={preventPropagation(onHide)}
              style={{ animationDuration: `${duration}s` }}
            />
          )}
        </Wrapper>
      )}
    </AnimatePresence>
  )
}

const Wrapper = styled(Flex)({
  position: 'fixed',
  bottom: '1rem',
  right: '2rem',
  color: 'var(--ve-background)',
  background: 'var(--ve-dark)',
  zIndex: 1001,
  padding: '1em',
  borderRadius: '4px',
  width: '460px',
  fontWeight: 500,
})

const FlashButton = styled(Button)({
  border: 'solid 1px var(--ve-background)',
  backgroundColor: 'transparent',
})

const ProgressKeyframe = keyframes({
  from: {
    transform: 'scaleX(0)',
  },
  to: {
    transform: 'scaleX(1)',
  },
})

const Progress = styled.div({
  display: 'block',
  position: 'absolute',
  bottom: '0',
  left: '0',
  width: '100%',
  height: '4px',
  transformOrigin: '0 0',
  backgroundColor: 'var(--ve-primary)',
  animation: `${ProgressKeyframe} 1s both linear`,
})

const FlashIn = keyframes({
  from: {
    transform: 'translateX(3em);',
    opacity: 0,
  },
  to: {
    transform: 'translateX(0)',
    opacity: 1,
  },
})

const FlashOut = keyframes({
  from: {
    transform: 'translateX(0)',
    opacity: 1,
  },
  to: {
    transform: 'translateX(-3em);',
    opacity: 0,
  },
})
