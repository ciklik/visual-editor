import { AbstractFieldGroup } from './fields/AbstractFieldGroup'
import { FunctionComponent } from 'react'

export type EditorComponentData = {
  _id: string
  _name: string
  [key: string]: any
}

export interface EditorField<V> {
  name: string
  field: FunctionComponent<EditorFieldProps<V>>
  defaultValue: V
  shouldRender: (data: Record<string, unknown>) => boolean
  injectStyle: (data: Record<string, any>) => Record<string, string> | null
}

export interface IndexableObject {
  _id: string
}

export type EditorFieldProps<V> = { value?: V; onChange: (value: V) => void }

export type EditorComponentDefinition = {
  // Titre du bloc
  title: string
  // Champs dont la valeur sera utilisé comme label de bloc
  label?: string
  // Champs du bloc
  fields: Array<EditorField<any> | AbstractFieldGroup<any>>
  // Catégorie du bloc
  category?: string
}

export type EditorComponentDefinitions = Record<string,
  EditorComponentDefinition>

export type DragData = {
  component: FunctionComponent
  [key: string]: any
}

export type EventWithTarget<T> = EventTarget & { target: T }

export type FieldCondition = (data: Record<string, any>) => boolean
