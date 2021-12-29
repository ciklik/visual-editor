import { SidebarHeading } from './SidebarHeading'
import { SidebarBlocWrapper } from 'src/components/Sidebar/SidebarBlocWrapper'
import { prevent } from 'src/functions/functions'
import { ButtonIcon, IconTrash } from 'src/components/ui'
import { useRemoveBloc } from 'src/store'
import { EditorComponentData } from 'src/types'

type SidebarBlocMissingProps = {
  data: EditorComponentData
}

export function SidebarBlocMissing({ data }: SidebarBlocMissingProps) {
  const removeBloc = useRemoveBloc()
  return (
    <SidebarBlocWrapper
      item={data}
      css={{
        backgroundColor: 'var(--ve-hover)',
        boxShadow: 'none',
      }}
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
    </SidebarBlocWrapper>
  )
}
