import Styles from './Sidebar.module.scss'
import { SidebarHeading } from './SidebarHeading'
import { prevent } from '../../functions/functions'
import { ButtonIcon } from '../ui/ButtonIcon'
import { IconTrash } from '../ui/Icons'
import { useRemoveBloc } from '../../store'
import { EditorComponentData } from '../../types'
import cx from 'clsx'
import { Sortable } from '../Sortable'

type SidebarBlocMissingProps = {
  data: EditorComponentData
}

export function SidebarBlocMissing({ data }: SidebarBlocMissingProps) {
  const removeBloc = useRemoveBloc()
  return (
    <Sortable
      item={data}
      className={cx(Styles.SidebarBloc, Styles.SidebarBlocMissing)}
    >
      <SidebarHeading title={`Bloc inconnu : ${data._name}`}>
        <ButtonIcon
          danger
          onClick={prevent(() => removeBloc(data))}
          title="Supprimer l'élément"
        >
          <IconTrash size={20} />
        </ButtonIcon>
      </SidebarHeading>
    </Sortable>
  )
}
