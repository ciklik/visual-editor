import { FunctionComponent } from 'preact'
import { AbstractFieldGroup } from './fields/AbstractFieldGroup'

export type EditorComponentData = {
  _id: string
  _name: string
  [key: string]: any
}

export interface EditorField<V> {
  name: string
  field: FunctionComponent<EditorFieldProps<V>>
  shouldRender: (data: Record<string, string>) => boolean
}

export interface IndexableObject {
  _id: string
}

export type EditorFieldProps<V> = { value?: V; onChange: (value: V) => void }

export type EditorComponentDefinition = {
  title: string
  label?: string
  fields: Array<EditorField<any> | AbstractFieldGroup<any>>
}

export type EditorComponentDefinitions = Record<
  string,
  EditorComponentDefinition
>

export type EventWithTarget<T> = EventTarget & { target: T }
