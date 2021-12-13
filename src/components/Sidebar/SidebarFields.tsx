import {
  EditorComponentData,
  EditorComponentDefinition,
  EditorField,
} from 'src/types'
import { AbstractFieldGroup } from 'src/fields/AbstractFieldGroup'
import { useUpdateData } from 'src/store'
import { useCallback } from 'react'

type SidebarFieldsProps = {
  fields: EditorComponentDefinition['fields']
  data: EditorComponentData
  path: string
}

export function SidebarFields({ fields, data, path }: SidebarFieldsProps) {
  return (
    <>
      {fields
        .filter((field) => field.shouldRender(data))
        .map((field, k) =>
          field instanceof AbstractFieldGroup
            ? field.shouldRender(data) && (
                <field.render key={k}>
                  <SidebarFields
                    fields={field.fields}
                    data={data}
                    path={path}
                  />
                </field.render>
              )
            : field.shouldRender(data) && (
                <SidebarField
                  key={field.name}
                  field={field}
                  value={field.name ? data[field.name] : undefined}
                  path={`${path}.${field.name}`}
                  style={field.injectStyle(data)}
                />
              )
        )}
    </>
  )
}

function SidebarField({
  field,
  value,
  path,
  style,
}: {
  field: EditorField<any>
  value: string
  path: string
  style: Record<string, string> | null
}) {
  const updateData = useUpdateData()
  const Component = field.field
  const onChangeCallback = useCallback(
    (value: any) => {
      updateData(value, path)
    },
    [path]
  )

  return (
    <div style={style as any}>
      <Component value={value} onChange={onChangeCallback} />
    </div>
  )
}
