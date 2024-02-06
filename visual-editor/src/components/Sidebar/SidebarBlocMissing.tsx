import { SidebarHeading } from './SidebarHeading'
import { SidebarBlocWrapper } from 'src/components/Sidebar/SidebarBlocWrapper'
import { prevent } from 'src/functions/functions'
import { ButtonIcon, IconTrash } from 'src/components/ui'
import { EditorComponentData } from 'src/types'
import { t } from 'src/functions/i18n'
import { usePartialStore } from 'src/store'

type SidebarBlocMissingProps = {
  data: EditorComponentData
}

/**
 * Component displayed when a component definition can't be resolved
 */
export function SidebarBlocMissing({ data }: SidebarBlocMissingProps) {
  const { removeBloc } = usePartialStore('removeBloc')
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
