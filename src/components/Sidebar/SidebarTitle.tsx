import type { MouseEventHandler, ReactNode } from 'react'
import { Flex } from 'src/components/ui/Flex'

import Styles from './Sidebar.module.scss'

type SidebarTitleProps = {
  children: ReactNode,
  title: string,
  onClick?: MouseEventHandler<HTMLElement>
}

export function SidebarTitle ({ children, onClick, title }: SidebarTitleProps) {
  const ElementComponent = onClick ? 'button' : 'div'
  return <Flex between className={Styles.SidebarHeader}>
    <ElementComponent className={Styles.SidebarHeader} onClick={onClick}>
      {title}
    </ElementComponent>
    {children}
  </Flex>
}

function SidebarTitleHoverable ({children}: {children: ReactNode}) {
  return <div className={Styles.SidebarHoverable}>
    {children}
  </div>
}

SidebarTitle.Hover = SidebarTitleHoverable
