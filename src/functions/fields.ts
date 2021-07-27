import { EditorField } from 'src/types'
import { AbstractFieldGroup } from '../fields/AbstractFieldGroup'

export function fillDefaults(
  data: Record<string, any>,
  fields: (EditorField<any> | AbstractFieldGroup<any>)[]
) {
  let newData = { ...data }
  for (const field of fields) {
    if (field instanceof AbstractFieldGroup) {
      newData = fillDefaults(newData, field.fields)
      continue
    }
    const name = field.name
    if (data[name] === undefined) {
      newData[name] = field.defaultValue
    }
  }
  return newData
}
