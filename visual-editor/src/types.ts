import { FunctionComponent, ReactElement } from 'react'
import {Translations} from 'src/langs/fr'

export type TranslationKey = keyof typeof Translations
export type Translation = Record<TranslationKey, string>

// The data exported by a component
export type EditorComponentData = {
  _id: string
  _name: string
  [key: string]: any
}

export type FieldFactory<O, V> = (name: string, options?: O) => FieldDefinition<O, V>
export type FieldComponent<O, V> = FunctionComponent<{ value: V, onChange: (v: V) => void, options: O }>

export type FieldGroupFactory<O> = (fields: FieldDefinition<any, any>[], options?: O) => FieldDefinition<O, never> & { group: true }
export type FieldGroupComponent<O> = FunctionComponent<{ options: O, children: ReactElement }>

export type FieldDefinition<O, V> = {
  name: string,
  options: O,
  render: FieldComponent<O, V>,
  shouldRender: (data: Record<string, unknown>) => boolean,
  group: false,
  when:  (fieldName: string, expectedValue: any) => FieldDefinition<O, V>
  injectStyle?: (data: Record<string, any>) => Record<string, string> | null
} | FieldGroupDefinition<O>
export type FieldGroupDefinition<O> = {
  options: O,
  render: FieldGroupComponent<O>,
  shouldRender: (data: Record<string, unknown>) => boolean,
  group: true
  fields: FieldDefinition<any, any>[],
  when: (fieldName: string, expectedValue: any) => FieldGroupDefinition<O>
}

export interface IndexableObject {
  _id: string
}

export type EditorComponentDefinition = {
  // Titre du bloc
  title: string
  // Champs dont la valeur sera utilisé comme label de bloc
  label?: string
  // Champs du bloc
  fields: Array<FieldDefinition<any, any>>
  // Catégorie du bloc
  category?: string
}

export type EditorComponentDefinitions = Record<string,
  EditorComponentDefinition>

export type DragData = {
  component: FunctionComponent
  [key: string]: any
}

export type FieldCondition = (data: Record<string, any>) => boolean
