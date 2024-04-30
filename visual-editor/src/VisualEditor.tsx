import React, { useMemo, useRef } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import type {
  Action,
  Device,
  EditorComponentData,
  EditorComponentDefinition,
  EditorComponentDefinitions,
  EditorComponentTemplate,
  Translation,
} from 'src/types'
import { Layout } from 'src/components/Layout'
import { Store, StoreProvider, usePartialStore } from 'src/store'
import { indexify, stringifyFields } from 'src/functions/object'
import { useClipboardPaste } from 'src/hooks/useClipboardPaste'
import { fillDefaults } from 'src/functions/fields'
import { useStateDelayed } from 'src/hooks/useStateDelayed'
import { BaseStyles } from 'src/components/BaseStyles'
import { Translations as EN } from 'src/langs/en'
import { useStopPropagation } from 'src/hooks/useStopPropagation'
import { InsertPosition } from 'src/enum'
import {
  Button,
  ButtonIcon,
  Card,
  Flex,
  Input,
  Field as FieldUI,
  Modal,
  Spinner,
  Label,
} from 'src/components/ui'

const components: EditorComponentDefinitions = {}
const templates: EditorComponentTemplate[] = []
const actions: Action[] = []
const defaultDevices: Device[] = [
  { name: 'Mobile', width: 390, height: '100%', icon: 'mobile' },
  { name: 'Desktop', width: '100%', height: '100%', icon: 'desktop' },
]

export { PreviewWrapper } from './elements/PreviewWrapper'
export { AddButton } from './elements/AddButton'
export type { EditorMessageEvents } from './components/Preview/PreviewPostMessage'

/**
 * Public interface for the module
 */
export class VisualEditor {
  static i18n: Translation = EN
  static postMessagePreview: boolean = false
  static devices: Device[]

  constructor(
    options: {
      lang?: Translation
      postMessagePreview?: boolean
      devices?: Device[]
    } = {}
  ) {
    VisualEditor.i18n = options.lang ?? EN
    VisualEditor.devices = options.devices ?? defaultDevices
    VisualEditor.postMessagePreview = options.postMessagePreview ?? false
  }

  registerComponent(name: string, definition: EditorComponentDefinition) {
    components[name] = { label: 'title', ...definition }
  }

  registerTemplate(template: EditorComponentTemplate) {
    templates.push(template)
  }

  registerButton(action: Action) {
    actions.push(action)
  }

  defineElement(elementName: string = 'visual-editor') {
    // We only declare the class in this function to avoid any problem with SSR
    class VisualEditorElement extends HTMLElement {
      static changeEventName = 'change'
      // React root
      private _root: Root | null = null
      // Access zustand store used by the VisualEditor
      private _store: Store | null = null

      static get observedAttributes() {
        return ['hidden', 'value']
      }

      get value(): string {
        return stringifyFields(this.valueAsArray)
      }

      get valueAsArray(): EditorComponentData[] {
        return this._store?.getState().data ?? []
      }

      set value(
        v:
          | string
          | EditorComponentData[]
          | ((v: EditorComponentData[]) => EditorComponentData[])
      ) {
        if (!this._store) {
          if (!v) {
            this.removeAttribute('value')
          } else {
            this.setAttribute(
              'value',
              typeof v === 'string' ? v : JSON.stringify(v)
            )
          }
          return
        }
        const state = this._store.getState()
        if (typeof v === 'string') {
          state.setDataFromOutside(this.parseValue(v))
          return
        }
        if (typeof v === 'function') {
          state.setDataFromOutside(v(state.data))
          return
        }
        state.setDataFromOutside(indexify(v))
      }

      connectedCallback() {
        this.render()
      }

      attributeChangedCallback(
        name: string,
        oldValue?: string,
        newValue?: string
      ) {
        if (!this._root) {
          return false
        }
        // Si la valeur change, on réinitialise la version traduite du JSON
        if (name === 'value' && newValue) {
          this.value = newValue
          return
        }
        this.render()
      }

      disconnectedCallback() {
        if (!this._root) {
          return
        }
        this._root.unmount()
        this._store = null
        this._root = null
      }

      private parseValue(value?: string): EditorComponentData[] {
        if (!value) {
          return []
        }
        try {
          const json = JSON.parse(value)
          return indexify(json).map((value: EditorComponentData) => {
            return fillDefaults(value, components[value._name]?.fields ?? [])
          })
        } catch (e) {
          console.error('Impossible de parser les données', value, e)
          alert("Impossible de parser les données de l'éditeur visuel")
          return []
        }
      }

      private render() {
        const data = this.parseValue(this.getAttribute('value')?.toString())
        const hiddenCategories =
          this.getAttribute('hidden-categories')?.split(';') ?? []

        if (!this._root) {
          this._root = createRoot(this)
        }

        this._root.render(
          <StoreProvider
            data={data}
            definitions={components}
            actions={actions}
            templates={templates}
            hiddenCategories={hiddenCategories}
            rootElement={this}
            devices={VisualEditor.devices}
            insertPosition={
              (this.getAttribute('insertPosition') ??
                InsertPosition.Start) as InsertPosition
            }
            onStore={(store) => (this._store = store)}
          >
            <VisualEditorComponent
              element={this}
              previewUrl={this.getAttribute('preview') ?? ''}
              iconsUrl={this.getAttribute('iconsUrl') ?? '/'}
              name={this.getAttribute('name') ?? ''}
              visible={this.getAttribute('hidden') === null}
            />
          </StoreProvider>
        )
      }
    }

    customElements.define(elementName, VisualEditorElement)
  }
}

type VisualEditorProps = {
  previewUrl: string
  name: string
  iconsUrl: string
  visible: boolean
  element: Element
}

export function VisualEditorComponent({
  previewUrl,
  name,
  element,
  iconsUrl,
  visible: visibleProps,
}: VisualEditorProps) {
  const visible = useStateDelayed(visibleProps)
  const handleClose = () => {
    element.dispatchEvent(new Event('close'))
  }

  useClipboardPaste(visible)
  // We want to avoid bubbling change & close event
  const div = useRef<HTMLDivElement>(null)
  useStopPropagation(div, ['change', 'close'])

  if (!visible) {
    return <HiddenTextarea name={name} />
  }

  return (
    <div ref={div}>
      <BaseStyles>
        <Layout
          onClose={handleClose}
          previewUrl={previewUrl}
          iconsUrl={iconsUrl}
        />
      </BaseStyles>
      <HiddenTextarea name={name} />
    </div>
  )
}

function HiddenTextarea({ name }: { name: string }) {
  const doNothing = () => null // React wants handler :(
  const { data } = usePartialStore('data')
  // JSON nettoyé
  const cleanedData = useMemo(() => stringifyFields(data), [data])
  return (
    <textarea hidden name={name} value={cleanedData} onChange={doNothing} />
  )
}

export const UI = {
  Button: Button,
  ButtonIcon: ButtonIcon,
  Flex: Flex,
  Card: Card,
  Input: Input,
  Field: FieldUI,
  Modal: Modal,
  Spinner: Spinner,
  Label: Label,
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
