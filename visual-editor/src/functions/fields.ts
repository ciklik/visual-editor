import { FieldDefinition } from 'src/types'

export function fillDefaults(
  data: Record<string, any>,
  fields: FieldDefinition<any, any>[]
) {
  let newData = { ...data }
  for (const field of fields) {
    if (field.group) {
      newData = fillDefaults(newData, field.fields)
      continue
    }
    const name = field.name
    if (data[name] === undefined) {
      newData[name] = field.options.default
    }
  }
  return newData
}
