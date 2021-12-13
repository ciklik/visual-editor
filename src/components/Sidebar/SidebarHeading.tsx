import type {
  ForwardedRef,
  ForwardRefExoticComponent,
  MouseEventHandler,
  ReactNode,
  RefAttributes,
} from 'react'
import { Flex } from 'src/components/ui/Flex'

import Styles from './Sidebar.module.scss'
import { forwardRef } from 'react'

type SidebarHeadingProps = {
  children: ReactNode
  title: string
  description?: string
  onClick?: MouseEventHandler<HTMLElement>
}

export const SidebarHeading = forwardRef<HTMLDivElement, SidebarHeadingProps>(
  (
    { children, onClick, title, description },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const ElementComponent = onClick ? 'button' : 'div'
    return (
      <Flex ref={ref} gap={0} between className={Styles.SidebarHeading}>
        <ElementComponent className={Styles.SidebarHeading} onClick={onClick}>
          <strong>{title}</strong>
          {description}
        </ElementComponent>
        {children}
      </Flex>
    )
  }
) as ForwardRefExoticComponent<
  SidebarHeadingProps & RefAttributes<HTMLDivElement>
> & { Hover: typeof SidebarHeadingHoverable }

SidebarHeading.displayName = 'SidebarHeading'

function SidebarHeadingHoverable({ children }: { children: ReactNode }) {
  return (
    <Flex className={Styles.SidebarHoverable} gap={0}>
      {children}
    </Flex>
  )
}

SidebarHeading.Hover = SidebarHeadingHoverable
