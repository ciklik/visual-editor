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
    const data = this.indexify(JSON.parse(this.innerText))
    this.innerText = '';
    render(<VisualEditorComponent content={data} definitions={components} previewUrl={this.getAttribute('preview') ?? ''} name={this.getAttribute('name') ?? ''}/>, this)
  }

  indexify<T extends unknown>(object: T) {
    if (Array.isArray(object)) {
      object.forEach((v, k) => {
        if (typeof v === 'object') {
          v._index = k.toString()
          this.indexify(v)
        }
      })
    } else if (typeof object === 'object') {
      Object.keys(object as Record<string, object>).forEach(key => this.indexify((object as Record<string, object>)[key]))
    }
    return object
  }

}

type VisualEditorProps = {
  content: EditorComponentData[],
  definitions: EditorComponentDefinitions,
  previewUrl: string,
  name: string,
}

export function VisualEditorComponent({ content, definitions, previewUrl, name }: VisualEditorProps) {
  const [data, setData] = useState(content)
  const onChange = useCallback((value: any, path?: string) => {
    if (path) {
      setData(data => deepSet(data, path, value))
    } else {
      setData(value)
    }
  }, [])

  const exportData = (data: EditorComponentData[]) => {
    return JSON.stringify(data, (key, value) => key === '_index' ? undefined : value)
  }

  return (
    <div class="ve-layout">
      <Sidebar content={data} definitions={definitions} onChange={onChange} />
      {previewUrl && <Preview data={data} previewUrl={previewUrl} />}
      <textarea class="ve-debug" name={name} value={exportData(data)} />
    </div>
  )
}
