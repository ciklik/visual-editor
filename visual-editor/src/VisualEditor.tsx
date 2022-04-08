import React, { useEffect, useMemo, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import type {
  EditorComponentData,
  EditorComponentDefinition,
  EditorComponentDefinitions,
  EditorComponentTemplate,
  Translation,
} from 'src/types'
import { Layout } from 'src/components/Layout'
import { StoreProvider, useData, useUpdateData } from 'src/store'
import { indexify, stringifyFields } from 'src/functions/object'
import { useClipboardPaste } from 'src/hooks/useClipboardPaste'
import { useUpdateEffect } from 'src/hooks/useUpdateEffect'
import { fillDefaults } from 'src/functions/fields'
import { useStateDelayed } from 'src/hooks/useStateDelayed'
import { BaseStyles } from 'src/components/BaseStyles'
import { Translations as EN } from 'src/langs/en'
import { useStopPropagation } from 'src/hooks/useStopPropagation'

const components: EditorComponentDefinitions = {}
const templates: EditorComponentTemplate[] = []

/**
 * Interface publique du module
 */
export class VisualEditor {
  static i18n: Translation = EN

  constructor(options: { lang?: Translation } = {}) {
    VisualEditor.i18n = options.lang || EN
  }

  registerComponent(name: string, definition: EditorComponentDefinition) {
    components[name] = { label: 'title', ...definition }
  }

  registerTemplate(template: EditorComponentTemplate) {
    templates.push(template)
  }

  defineElement(elementName: string = 'visual-editor') {
    // We only declare the class in this function to avoid any problem with SSR
    class VisualEditorElement extends HTMLElement {
      static changeEventName = 'change'
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
        this._value = this.getAttribute('value') || '[]'
        this.render()
        this._mounted = true
      }

      attributeChangedCallback(
        name: string,
        oldValue?: string,
        newValue?: string
      ) {
        if (!this._mounted) {
          return false
        }
        // Si la valeur change, on réinitialise la version traduite du JSON
        if (name === 'value') {
          // Saute le nouveau rendu si la valeur n'est pas nouvelle
          if (newValue === this._value) {
            return
          }
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
            this._data = indexify(json).map((value: EditorComponentData) => {
              return fillDefaults(value, components[value._name]?.fields ?? [])
            })
          } catch (e) {
            console.error('Impossible de parser les données', value, e)
            alert("Impossible de parser les données de l'éditeur visuel")
            this._data = []
          }
        }
        return this._data!
      }

      private render() {
        const data = this.parseValue(this._value)
        const hiddenCategories =
          this.getAttribute('hidden-categories')?.split(';') ?? []
        createRoot(this).render(
          <StoreProvider
            data={data}
            definitions={components}
            templates={templates}
            hiddenCategories={hiddenCategories}
            rootElement={this}
          >
            <VisualEditorComponent
              element={this}
              value={data}
              previewUrl={this.getAttribute('preview') ?? ''}
              iconsUrl={this.getAttribute('iconsUrl') ?? '/'}
              name={this.getAttribute('name') ?? ''}
              visible={this.getAttribute('hidden') === null}
              onChange={(value: string) => {
                if (this._value === value) {
                  return
                }
                this._value = value
                this.dispatchEvent(
                  new CustomEvent('change', {
                    detail: value,
                  })
                )
              }}
            />
          </StoreProvider>
        )
      }
    }
    customElements.define(elementName, VisualEditorElement)
  }
}

type VisualEditorProps = {
  value: EditorComponentData[]
  previewUrl: string
  name: string
  iconsUrl: string
  visible: boolean
  element: Element
  onChange: (v: string) => void
}

export function VisualEditorComponent({
  value,
  previewUrl,
  name,
  element,
  iconsUrl,
  visible: visibleProps,
  onChange,
}: VisualEditorProps) {
  const skipNextChange = useRef(true) // Skip emitting a change event on the next update (usefull for external changes)
  const updateData = useUpdateData()
  const data = useData()
  const visible = useStateDelayed(visibleProps)
  const handleClose = () => {
    element.dispatchEvent(new Event('close'))
  }
  const doNothing = () => null // React wants handler :(
  // JSON nettoyé
  const cleanedData = useMemo(() => stringifyFields(data), [data])
  // Synchronise l'état du composant avec la prop value
  useUpdateEffect(() => {
    skipNextChange.current = true
    updateData(value)
  }, [value])

  useClipboardPaste(visible)
  useEffect(() => {
    if (skipNextChange.current) {
      skipNextChange.current = false
    } else {
      onChange(cleanedData)
    }
  }, [cleanedData])
  // We want to avoid bubbling change & close event
  const div = useRef<HTMLDivElement>(null)
  useStopPropagation(div, ['change', 'close'])

  if (!visible) {
    return (
      <textarea hidden name={name} value={cleanedData} onChange={doNothing} />
    )
  }

  return (
    <div ref={div}>
      <BaseStyles>
        <Layout
          data={data}
          onClose={handleClose}
          previewUrl={previewUrl}
          iconsUrl={iconsUrl}
        />
      </BaseStyles>
      <textarea hidden name={name} value={cleanedData} onChange={doNothing} />
    </div>
  )
}

// Exporte les champs
export { Text } from 'src/fields/Text'
export { Field } from 'src/components/ui'
export { Checkbox } from 'src/fields/Checkbox'
export { Repeater } from 'src/fields/Repeater'
export { ImageUrl } from 'src/fields/ImageUrl'
export { HTMLText } from 'src/fields/HTMLText'
export { Color } from 'src/fields/Color'
export { Row } from 'src/fields/Row'
export { Alignment } from 'src/fields/Alignment'
export { Select } from 'src/fields/Select'
export { Number } from 'src/fields/Number'
export { Range } from 'src/fields/Range'
export { Tabs } from 'src/fields/Tabs'
export { DatePicker } from 'src/fields/DatePicker'
export { TextAlign } from 'src/fields/TextAlign'
export { Translations as FR } from 'src/langs/fr'
export { Translations as EN } from 'src/langs/en'
export { BaseStyles }
export { defineField, defineFieldGroup } from 'src/fields/utils'
export { FieldsRenderer } from 'src/components/Sidebar/FieldsRenderer'
export { React }
