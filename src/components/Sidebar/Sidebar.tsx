import { EditorComponentData } from 'src/types'
import { SidebarFields } from 'src/components/Sidebar/SidebarFields'
import { SidebarHeader } from 'src/components/Sidebar/SidebarHeader'

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
      <SidebarHeader onClose={onClose} />
      <SidebarFields data={data} />
    </div>
  )
}
