import { EditorComponentData, EditorComponentDefinition } from 'src/types'
import { useUpdateData } from 'src/store'
import { FieldsRenderer } from 'src/components/Sidebar/FieldsRenderer'

type SidebarFieldsProps = {
  fields: EditorComponentDefinition['fields']
  data: EditorComponentData
  path: string
}

export function SidebarFields({ fields, data, path }: SidebarFieldsProps) {
  const updateData = useUpdateData()
  return (
    <FieldsRenderer
      fields={fields}
      data={data}
      onUpdate={updateData}
      path={path}
    />
  )
}
