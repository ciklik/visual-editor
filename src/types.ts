import { FunctionComponent } from 'preact'

export type EditorComponentData = {
  name: string,
  data: Record<string, any>
}

export interface EditorField {
  name: string
  field: FunctionComponent<any>
}

export type EditorComponentDefinition = {
  title: string,
  fields: EditorField[]
}

export type EditorComponentDefinitions = Record<string, EditorComponentDefinition>
