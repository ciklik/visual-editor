import { ComponentChildren, render } from 'preact'
import { EditorComponentDefinition, EditorComponentData, EditorComponentDefinitions } from './types'
import { Sidebar } from './components/Sidebar'
import { useCallback, useEffect, useState } from 'preact/hooks'
import { deepSet } from './functions/object'
import { Preview } from './components/Preview'

const components: EditorComponentDefinitions = {}

export class VisualEditor {

  registerComponent (name: string, definition: EditorComponentDefinition) {
    components[name] = definition
  }

  defineElement(elementName: string = "visual-editor") {
    customElements.define(elementName, VisualEditorElement)
  }

}

class VisualEditorElement extends HTMLElement {

  connectedCallback () {
    const data = JSON.parse(this.innerText)
    this.innerText = '';
    render(<VisualEditorComponent content={data} definitions={components} previewUrl={this.getAttribute('preview') || ''}/>, this)
  }

}

type VisualEditorProps = {
  children: ComponentChildren,
  content: EditorComponentData[],
  definitions: EditorComponentDefinitions,
  previewUrl: string,
}

export function VisualEditorComponent({ children, content, definitions, previewUrl }: VisualEditorProps) {
  const [data, setData] = useState(content)
  const onChange = useCallback((value: any, path: string) => {
    setData(data => deepSet(data, path, value))
  }, [])

  return (
    <div class="ve-layout">
      <Sidebar content={data} definitions={definitions} onChange={onChange} />
      {previewUrl && <Preview data={data} previewUrl={previewUrl} />}
    </div>
  )
}
