import type { MouseEventHandler, ReactNode } from 'react'
import Styles from './Flash.module.scss'
import { Flex } from './Flex'
import { Button } from './Button'

type FlashProps = {
  children: ReactNode
  action?: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export function Flash({ children, action, onClick }: FlashProps) {
  return (
    <Flex between className={Styles.Flash}>
      <div>{children}</div>
      {action && (
        <Button className={Styles.FlashButton} onClick={onClick}>
          {action}
        </Button>
      )}
    </Flex>
  )
}
