import { EditorComponentData } from 'src/types'
import { SidebarFields } from 'src/components/Sidebar/SidebarFields'
import { SidebarFooter } from 'src/components/Sidebar/SidebarFooter'

import Styles from './Sidebar.module.scss'

export function Sidebar({
  data,
  onClose,
}: {
  data: EditorComponentData[]
  onClose: () => void
}) {
  return (
    <div className={Styles.Sidebar}>
      <SidebarFooter onClose={onClose} />
      <SidebarFields data={data} />
    </div>
  )
}
