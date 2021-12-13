import Styles from './Sidebar.module.scss'
import { SidebarHeading } from './SidebarHeading'
import { prevent } from 'src/functions/functions'
import { ButtonIcon, IconTrash } from 'src/components/ui'
import { useRemoveBloc } from 'src/store'
import { EditorComponentData } from 'src/types'
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
