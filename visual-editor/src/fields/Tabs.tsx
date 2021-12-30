import React, { cloneElement } from 'react'
import { FieldDefinition, FieldGroupComponent, FieldGroupDefinition } from 'src/types'
import { defaultFieldProperties } from 'src/fields/utils'
import { Flex, Tabs as TabsComponent } from 'src/components/ui'

type TabDefinition = {
  label: string
  fields: Array<FieldDefinition<any, any>>
}

type FieldOptions = {
  tabs: TabDefinition[]
}

const Component: FieldGroupComponent<FieldOptions> = ({ children, options }) => {
  const childrenForTab = (tab: TabDefinition) => {
    return cloneElement(children, {
      fields: tab.fields,
    })
  }

  return (
    <TabsComponent>
      {options.tabs.map((tab) => (
        <TabsComponent.Tab key={tab.label} title={tab.label}>
          <Flex column>{childrenForTab(tab)}</Flex>
        </TabsComponent.Tab>
      ))}
    </TabsComponent>
  )
}

export function Tabs (...tabs: TabDefinition[]): FieldGroupDefinition<FieldOptions> {
  return {
    ...defaultFieldProperties(),
    group: true,
    options: {tabs: tabs},
    render: Component,
    fields: tabs.reduce(
      (acc, tab) => [...acc, ...tab.fields],
      [] as TabDefinition['fields']
    )
  }
}
