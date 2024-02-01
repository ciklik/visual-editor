import { SidebarHeading } from './SidebarHeading'
import { SidebarBlocWrapper } from 'src/components/Sidebar/SidebarBlocWrapper'
import { prevent } from 'src/functions/functions'
import { ButtonIcon, IconTrash } from 'src/components/ui'
import { useRemoveBloc } from 'src/store'
import { EditorComponentData } from 'src/types'
import { t } from 'src/functions/i18n'

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
      <SidebarHeading title={`${t('unknownComponent')} : ${data._name}`}>
        <ButtonIcon
          danger
          onClick={prevent(() => removeBloc(data._id))}
          title={t('deleteComponent')}
        >
          <IconTrash size={20} />
        </ButtonIcon>
      </SidebarHeading>
    </SidebarBlocWrapper>
  )
}
