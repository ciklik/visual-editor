import { EditorComponentData } from 'src/types'
import { SidebarBlocs } from 'src/components/Sidebar/SidebarBlocs'
import { SidebarHeader } from 'src/components/Sidebar/SidebarHeader'

import Styles from './Sidebar.module.scss'
import { ButtonIcon } from '../ui/ButtonIcon'
import { IconBack } from '../ui/Icons'

export function Sidebar({
  data,
  onClose,
}: {
  data: EditorComponentData[]
  onClose: () => void
}) {
  return (
    <div className={Styles.Sidebar}>
      <ButtonIcon className={Styles.SidebarCollapse}>
        <IconBack size={20} />
      </ButtonIcon>
      <SidebarHeader onClose={onClose} />
      <SidebarBlocs data={data} />
    </div>
  )
}
