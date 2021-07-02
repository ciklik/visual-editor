import { ComponentChildren, render } from 'preact'
import { EditorComponentDefinition, EditorComponentData, EditorComponentDefinitions } from './types'
import { Sidebar } from './components/Sidebar'

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
    render(<VisualEditorComponent content={data} definitions={components}/>, this)
  }

}

type VisualEditorProps = {
  children: ComponentChildren,
  content: EditorComponentData[],
  definitions: EditorComponentDefinitions
}

export function VisualEditorComponent({ children, content, definitions }: VisualEditorProps) {
  return (
    <div class="ve-layout">
      <Sidebar content={content} definitions={definitions} />
      <iframe src="https://getbootstrap.com/docs/5.0/examples/product/"></iframe>
    </div>
  )
}
