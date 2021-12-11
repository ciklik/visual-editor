import type { MouseEventHandler, ReactNode } from 'react'
import { Flex } from 'src/components/ui/Flex'

import Styles from './Sidebar.module.scss'

type SidebarHeadingProps = {
  children: ReactNode
  title: string
  description?: string
  onClick?: MouseEventHandler<HTMLElement>
}

export function SidebarHeading({
  children,
  onClick,
  title,
  description,
}: SidebarHeadingProps) {
  const ElementComponent = onClick ? 'button' : 'div'
  return (
    <Flex gap={0} between className={Styles.SidebarHeading}>
      <ElementComponent className={Styles.SidebarHeading} onClick={onClick}>
        <strong>{title}</strong>
        {description}
      </ElementComponent>
      {children}
    </Flex>
  )
}

function SidebarHeadingHoverable({ children }: { children: ReactNode }) {
  return (
    <Flex className={Styles.SidebarHoverable} gap={0}>
      {children}
    </Flex>
  )
}

SidebarHeading.Hover = SidebarHeadingHoverable
