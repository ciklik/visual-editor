import type { ReactElement, ReactNode } from 'react'
import React, { useState } from 'react'
import {
  Tabs as RadixTabs,
  TabsContent,
  TabsList as RadixTabsList,
  TabsTrigger,
} from '@radix-ui/react-tabs'

import styled from '@emotion/styled'

type TabsProps = {
  children: ReactNode
}
type TabProps = {
  children: ReactNode
  title: string
}

const TabsList = styled(RadixTabsList)({
  display: 'flex',
  gap: '.5rem',
  marginBottom: '1em',
})

const TabButton = styled(TabsTrigger)({
  backgroundColor: 'var(--ve-hover)',
  borderRadius: 56,
  padding: '.6rem 1rem',
  border: 'none',
  fontWeight: 500,
  cursor: 'pointer',
  transition: 'color .3s, background-color .3s',
})

const TabButtonSelected = {
  color: 'var(--ve-primary)',
  backgroundColor: 'var(--ve-primary-light)',
}

export function Tabs({ children, ...props }: TabsProps) {
  const childrenArray = React.Children.toArray(
    children
  ) as ReactElement<TabProps>[]
  const [currentTab, setCurrentTab] = useState(childrenArray[0]?.props.title)
  return (
    <RadixTabs value={currentTab} onValueChange={setCurrentTab}>
      <TabsList {...props}>
        {childrenArray.map((child) => (
          <TabButton
            css={[currentTab === child.props.title && TabButtonSelected]}
            value={child.props.title}
            key={child.props.title}
          >
            {child.props.title}
          </TabButton>
        ))}
      </TabsList>
      {childrenArray.map((child) => (
        <TabsContent key={child.props.title} value={child.props.title}>
          {child}
        </TabsContent>
      ))}
    </RadixTabs>
  )
}

function Tab(props: TabProps) {
  return <div {...props} />
}

Tabs.Tab = Tab
