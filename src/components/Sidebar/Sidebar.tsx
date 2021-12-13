import { EditorComponentData } from 'src/types'
import { SidebarBlocs } from 'src/components/Sidebar/SidebarBlocs'
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
      <SidebarBlocs data={data} />
    </div>
  )
}
