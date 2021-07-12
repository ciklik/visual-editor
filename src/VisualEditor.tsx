import './css/style.scss'

import { render } from 'preact'
import {
  EditorComponentData,
  EditorComponentDefinition,
  EditorComponentDefinitions,
} from 'src/types'
import { useEffect, useMemo } from 'preact/hooks'
import { useVisibilityClass } from 'src/hooks/useVisibilityClass'
import { Layout } from 'src/components/Layout'
import { useData, useUpdateData } from 'src/store'
import { indexify, stringifyFields } from 'src/functions/object'
import { useClipboardPaste } from 'src/hooks/useClipboardPaste'

const components: EditorComponentDefinitions = {}

/**
 * Interface publique du module
 */
export class VisualEditor {
  registerComponent(name: string, definition: EditorComponentDefinition) {
    components[name] = { label: 'title', ...definition }
  }

  defineElement(elementName: string = 'visual-editor') {
    customElements.define(elementName, VisualEditorElement)
  }
}

/**
 * On déclare notre custom element
 */
class VisualEditorElement extends HTMLElement {
  private _data: EditorComponentData[] | null = null
  private _mounted: boolean = false

  static get observedAttributes() {
    return ['hidden', 'value']
  }

  get data(): EditorComponentData[] {
    if (this._data === null) {
      this._data = this.parseData(this.getAttribute('value') ?? '')
    }
    return this._data as EditorComponentData[]
  }

  connectedCallback() {
    if (this.innerText) {
      this._data = this.parseData(this.innerText)
      this.innerText = ''
    }
    this.render()
    this._mounted = true
  }

  attributeChangedCallback(name: string, oldValue?: string, newValue?: string) {
    if (!this._mounted) {
      return false
    }
    // Si la valeur change, on réinitialise la version traduite du JSON
    if (name === 'value') {
      this._data = null
    }
    this.render()
  }

  disconnectedCallback() {
    this._mounted = false
  }

  private parseData(data: string): EditorComponentData[] {
    try {
      const json = JSON.parse(data)
      return indexify(json)
    } catch (e) {
      console.error('Impossible de parser les données', data, e)
      return []
    }
  }

  private render() {
    render(
      <VisualEditorComponent
        element={this}
        value={this.data}
        definitions={components}
        previewUrl={this.getAttribute('preview') ?? ''}
        name={this.getAttribute('name') ?? ''}
        visible={this.getAttribute('hidden') === null}
        onChange={(value: string) =>
          this.dispatchEvent(
            new CustomEvent('veChange', {
              detail: stringifyFields(value),
            })
          )
        }
      />,
      this
    )
  }
}

type VisualEditorProps = {
  value: EditorComponentData[]
  definitions: EditorComponentDefinitions
  previewUrl: string
  name: string
  visible: boolean
  element: Element
  onChange: (v: string) => void
}

export function VisualEditorComponent({
  value,
  definitions,
  previewUrl,
  name,
  element,
  visible: visibleProps,
  onChange,
}: VisualEditorProps) {
  const updateData = useUpdateData()
  const data = useData()
  const [visibilityClass, visible] = useVisibilityClass(visibleProps)
  const handleClose = () => {
    element.dispatchEvent(new Event('veClose'))
  }
  // JSON nettoyé
  const cleanedData = useMemo(() => stringifyFields(data), [data])
  // Synchronise l'état du composant avec la prop value
  useEffect(() => {
    updateData(value)
  }, [value])

  useClipboardPaste()

  if (!visible) {
    return <textarea hidden name={name} value={cleanedData} />
  }

  return (
    <>
      <Layout
        class={visibilityClass}
        data={data}
        definitions={definitions}
        onClose={handleClose}
        previewUrl={previewUrl}
      />
      <textarea hidden name={name} value={cleanedData} class="ve-debug" />
    </>
  )
}

// Exporte les champs
export { Text } from 'src/fields/Text'
export { Checkbox } from 'src/fields/Checkbox'
export { Button } from 'src/fields/Button'
export { Repeater } from 'src/fields/Repeater'
export { AbstractField } from 'src/fields/AbstractField'
export { ImageUrl } from 'src/fields/ImageUrl'
export { HTMLText } from 'src/fields/HTMLText'
export { Color } from 'src/fields/Color'
