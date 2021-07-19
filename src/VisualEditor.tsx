import './css/style.scss'

import { render } from 'preact'
import {
  EditorComponentData,
  EditorComponentDefinition,
  EditorComponentDefinitions,
} from 'src/types'
import { useEffect, useMemo, useRef } from 'preact/hooks'
import { useVisibilityClass } from 'src/hooks/useVisibilityClass'
import { Layout } from 'src/components/Layout'
import { StoreProvider, useData, useUpdateData } from 'src/store'
import { indexify, stringifyFields } from 'src/functions/object'
import { useClipboardPaste } from 'src/hooks/useClipboardPaste'
import { useHistory } from 'src/hooks/useHistory'
import { useUpdateEffect } from './hooks/useUpdateEffect'

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
  static changeEventName = 'veChange'
  private _mounted: boolean = false
  private _data: EditorComponentData[] | null = null
  private _value = ''

  static get observedAttributes() {
    return ['hidden', 'value']
  }

  get value(): string {
    return this._value
  }

  set value(v: string) {
    if (v === this._value) {
      return
    }
    this._value = v
    this._data = null
    this.render()
  }

  connectedCallback() {
    this._value = this.innerText || this.getAttribute('value') || '[]'
    this.innerText = ''
    this.render()
    this._mounted = true
    this.addEventListener(
      VisualEditorElement.changeEventName,
      (event: CustomEventInit<string>) => {
        this._value = event.detail!
      }
    )
  }

  attributeChangedCallback(name: string, oldValue?: string, newValue?: string) {
    if (!this._mounted) {
      return false
    }
    // Si la valeur change, on réinitialise la version traduite du JSON
    if (name === 'value') {
      this._value = newValue!
    }
    this.render()
  }

  disconnectedCallback() {
    this._mounted = false
  }

  private parseValue(value: string): EditorComponentData[] {
    if (this._data === null) {
      try {
        const json = JSON.parse(value)
        this._data = indexify(json)
      } catch (e) {
        console.error('Impossible de parser les données', value, e)
        this._data = []
      }
    }
    return this._data!
  }

  private render() {
    const data = this.parseValue(this._value)
    render(
      <StoreProvider data={data}>
        <VisualEditorComponent
          element={this}
          value={data}
          definitions={components}
          previewUrl={this.getAttribute('preview') ?? ''}
          name={this.getAttribute('name') ?? ''}
          visible={this.getAttribute('hidden') === null}
          onChange={(value: string) =>
            this.dispatchEvent(
              new CustomEvent('veChange', {
                detail: value,
              })
            )
          }
        />
      </StoreProvider>,
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
  const skipNextChange = useRef(true) // Skip emitting a change event on the next update (usefull for external changes)
  const updateData = useUpdateData()
  const data = useData()
  const [visibilityClass, visible] = useVisibilityClass(visibleProps)
  const handleClose = () => {
    element.dispatchEvent(new Event('veClose'))
  }
  // JSON nettoyé
  const cleanedData = useMemo(() => stringifyFields(data), [data])
  // Synchronise l'état du composant avec la prop value
  useUpdateEffect(() => {
    skipNextChange.current = true
    updateData(value)
  }, [value])

  useClipboardPaste()
  useHistory(data)
  useEffect(() => {
    if (skipNextChange.current) {
      skipNextChange.current = false
    } else {
      onChange(cleanedData)
    }
  }, [cleanedData])

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
      <textarea hidden name={name} value={cleanedData} />
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
