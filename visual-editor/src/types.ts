import { FunctionComponent, ReactElement } from 'react'
import { Translations } from 'src/langs/fr'

export type TranslationKey = keyof typeof Translations
export type Translation = Record<TranslationKey, string>

// The data exported by a component
export type EditorComponentData = {
  _id: string
  _name: string
  [key: string]: any
}

export type EditorComponentTemplate = {
  name: string
  description: string
  image: string
  data:
    | Omit<EditorComponentData, '_id'>[]
    | (() => Promise<Omit<EditorComponentData, '_id'>[]>)
}

export type FieldComponent<
  FieldOptions,
  FieldValue,
  FieldExtraParams = {}
> = FunctionComponent<
  {
    value: FieldValue
    onChange: (v: FieldValue) => void
    options: FieldOptions
  } & FieldExtraParams
>
export type FieldGroupComponent<O> = FunctionComponent<{
  options: O
  children: ReactElement
}>

export type FieldDefinition<O = Record<string, unknown>, V = unknown> =
  | SingleFieldDefinition<O, V>
  | FieldGroupDefinition<O>
export type SingleFieldDefinition<O, V> = {
  name: string
  options: O
  render: FieldComponent<O, V>
  shouldRender: (data: Record<string, unknown>) => boolean
  group?: false
  extraProps?: (data: Record<string, unknown>) => Record<string, any>
}
export type FieldGroupDefinition<O> = {
  options: O
  render: FieldGroupComponent<O>
  shouldRender: (data: Record<string, unknown>) => boolean
  group: true
  fields: FieldDefinition[]
}

export interface IndexableObject {
  _id: string
}

export type EditorComponentDefinition = {
  // Bloc title
  title: string
  // Field used for the block label
  label?: string
  // Fields inside the block
  fields: Array<FieldDefinition<any, any>>
  // Block category
  category?: string
}

export type EditorComponentDefinitions = Record<
  string,
  EditorComponentDefinition
>

export type DragData = {
  component: FunctionComponent
  [key: string]: any
}

export type FieldCondition = (data: Record<string, any>) => boolean
