import type { MouseEventHandler, ReactNode } from 'react'
import { Flex } from 'src/components/ui/Flex'

import Styles from './Sidebar.module.scss'

type SidebarTitleProps = {
  children: ReactNode,
  title: string,
  description?: string,
  onClick?: MouseEventHandler<HTMLElement>
}

export function SidebarTitle ({ children, onClick, title, description }: SidebarTitleProps) {
  const ElementComponent = onClick ? 'button' : 'div'
  return <Flex gap={.5} between className={Styles.SidebarHeader}>
    <ElementComponent className={Styles.SidebarHeader} onClick={onClick}>
      <strong>{title}</strong>
      {description}
    </ElementComponent>
    {children}
  </Flex>
}

function SidebarTitleHoverable ({children}: {children: ReactNode}) {
  return <Flex className={Styles.SidebarHoverable}>
    {children}
  </Flex>
}

SidebarTitle.Hover = SidebarTitleHoverable
