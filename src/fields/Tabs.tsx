import { AbstractFieldGroup } from './AbstractFieldGroup'
import React, {
  cloneElement,
  FunctionComponent,
  ReactElement,
  ReactNode,
  useState,
} from 'react'
import { EditorField } from 'src/types'
import { prevent } from 'src/functions/functions'
import { Flex } from '../components/ui/Flex'

type RowArgs = {
  label?: string
  columns?: string
}

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
    const [currentTab, setTab] = useState<TabDefinition>(this.tabs[0]!)
    const currentChildren = cloneElement(children, {
      fields: currentTab.fields,
    })
    return (
      <Flex column>
        <div role="tablist" className="ve-tabs">
          {this.tabs.map((tab) => (
            <button
              key={tab.label}
              aria-selected={currentTab === tab}
              onClick={prevent(() => setTab(tab))}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {currentChildren}
      </Flex>
    )
  }
}
