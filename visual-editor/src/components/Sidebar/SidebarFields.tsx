import { EditorComponentData, EditorComponentDefinition } from 'src/types'
import { FieldsRenderer } from 'src/components/Sidebar/FieldsRenderer'
import { usePartialStore } from 'src/store'

type SidebarFieldsProps = {
  fields: EditorComponentDefinition['fields']
  data: EditorComponentData
  path: string
}

export function SidebarFields({ fields, data, path }: SidebarFieldsProps) {
  const { updateData } = usePartialStore('updateData')
  return (
    <FieldsRenderer
      fields={fields}
      data={data}
      onUpdate={updateData}
      path={path}
    />
  )
}
