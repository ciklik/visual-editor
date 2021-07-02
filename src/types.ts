import { FunctionComponent } from 'preact'

export type EditorComponentData = {
  name: string,
  data: Record<string, any>
}

export interface EditorField<V> {
  name: string
  field: FunctionComponent<EditorFieldProps<V>>
}

export type EditorFieldProps<V> = { value?: V, onChange: (value: V) => void }

export type EditorComponentDefinition = {
  title: string,
  fields: EditorField<any>[]
}

export type EditorComponentDefinitions = Record<string, EditorComponentDefinition>
