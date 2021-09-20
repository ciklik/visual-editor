import { AbstractFieldGroup } from './AbstractFieldGroup'
import { cloneElement, FunctionComponent, toChildArray, VNode } from 'preact'
import { EditorField } from '../types'
import { useState } from 'preact/hooks'
import { prevent } from '../functions/functions'

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
    super([], {})
    this.tabs = tabs
  }

  render: FunctionComponent<{ children: VNode<any> }> = ({ children }) => {
    const [currentTab, setTab] = useState<TabDefinition>(this.tabs[0])
    const currentChildren = cloneElement(children, {
      fields: currentTab.fields,
    })
    console.log(currentChildren)
    return (
      <div class="ve-sidebar-fields">
        <div role="tablist" class="ve-tabs">
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
      </div>
    )
  }
}
