import { AbstractFieldGroup } from './AbstractFieldGroup'
import React, {
  cloneElement,
  FunctionComponent,
  ReactElement,
  useState,
} from 'react'
import { EditorField } from 'src/types'
import { Flex, Tabs as TabsComponent } from 'src/components/ui'

type TabDefinition = {
  label: string
  fields: Array<EditorField<any> | AbstractFieldGroup<any>>
}

export class Tabs extends AbstractFieldGroup<any> {
  tabs: TabDefinition[] = []

  constructor(...tabs: TabDefinition[]) {
    super(
      tabs.reduce(
        (acc, tab) => [...acc, ...tab.fields],
        [] as TabDefinition['fields']
      ),
      {}
    )
    this.tabs = tabs
  }

  render: FunctionComponent<{ children: ReactElement }> = ({ children }) => {
    const childrenForTab = (tab: TabDefinition) => {
      return cloneElement(children, {
        fields: tab.fields,
      })
    }

    return (
      <TabsComponent>
        {this.tabs.map((tab) => (
          <TabsComponent.Tab key={tab.label} title={tab.label}>
            <Flex column>{childrenForTab(tab)}</Flex>
          </TabsComponent.Tab>
        ))}
      </TabsComponent>
    )
  }
}
