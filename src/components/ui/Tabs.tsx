import type { ReactElement, ReactNode } from 'react'
import React, { useState } from 'react'
import {
  Tabs as RadixTabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@radix-ui/react-tabs'

import Styles from './Tabs.module.scss'
import cx from 'clsx'

type TabsProps = {
  children: ReactNode
  className?: string
}
type TabProps = {
  children: ReactNode
  title: string
}

export function Tabs({ children, className }: TabsProps) {
  const childrenArray = React.Children.toArray(
    children
  ) as ReactElement<TabProps>[]
  const [currentTab, setCurrentTab] = useState(childrenArray[0]?.props.title)
  return (
    <RadixTabs value={currentTab} onValueChange={setCurrentTab}>
      <TabsList className={cx(Styles.Tabs, className)}>
        {childrenArray.map((child) => (
          <TabsTrigger
            className={cx(
              Styles.Tab,
              currentTab === child.props.title && Styles.TabSelected
            )}
            value={child.props.title}
            key={child.props.title}
          >
            {child.props.title}
          </TabsTrigger>
        ))}
      </TabsList>
      {childrenArray.map((child) => (
        <TabsContent key={child.props.title} value={child.props.title}>
          {child.props.children}
        </TabsContent>
      ))}
    </RadixTabs>
  )
}

function Tab({ children }: TabProps) {
  return <div>{children}</div>
}

Tabs.Tab = Tab
