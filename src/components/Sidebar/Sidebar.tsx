import { EditorComponentData } from 'src/types'
import { SidebarFields } from 'src/components/Sidebar/SidebarFields'
import { SidebarFooter } from 'src/components/Sidebar/SidebarFooter'

export function Sidebar({
  data,
  onClose,
}: {
  data: EditorComponentData[]
  onClose: () => void
}) {
  return (
    <div class="ve-sidebar">
      <SidebarFooter onClose={onClose} />
      <SidebarFields data={data} />
    </div>
  )
}
