import { EditorComponentData, EditorComponentDefinition, FieldDefinition } from 'src/types'
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
          field.group
            ? (
                <field.render key={k} options={field.options}>
                  <SidebarFields
                    fields={field.fields}
                    data={data}
                    path={path}
                  />
                </field.render>
              )
            : (
                <SidebarField
                  key={field.name}
                  field={field}
                  value={field.name ? data[field.name] : undefined}
                  path={`${path}.${field.name}`}
                  extraProps={field.extraProps ? field.extraProps(data) : undefined}
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
  extraProps,
}: {
  field: FieldDefinition & {group?: false}
  value: string
  path: string
  extraProps?: Record<string, any>
}) {
  const updateData = useUpdateData()
  const Component = field.render
  const onChangeCallback = useCallback(
    (value: any) => {
      updateData(value, path)
    },
    [path]
  )

  return (
      <Component
        value={value}
        onChange={onChangeCallback}
        options={field.options}
        {...extraProps}
      />
  )
}
