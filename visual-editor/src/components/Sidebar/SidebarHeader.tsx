import { prevent } from 'src/functions/functions'
import {
  PreviewModes,
  useData,
  usePreviewMode,
  useSetBlockIndex,
  useTogglePreviewMode,
} from 'src/store'
import {
  Button,
  ButtonIcon,
  Flex,
  IconCirclePlus,
  IconCross,
  IconDesktop,
  IconPhone,
} from 'src/components/ui'
import { CopyAction } from './Actions/CopyAction'

import styled from '@emotion/styled'
import { t } from 'src/functions/i18n'

type SidebarHeaderProps = {
  onClose: () => void
}

export function SidebarHeader({ onClose }: SidebarHeaderProps) {
  const togglePreviewMode = useTogglePreviewMode()
  const previewMode = usePreviewMode()
  const isPhone = previewMode === PreviewModes.PHONE
  const setAddBlock = useSetBlockIndex()
  const data = useData()

  return (
    <Wrapper between>
      <div>
        <ButtonIcon title="Fermer" onClick={prevent(onClose)}>
          <IconCross size={12} />
        </ButtonIcon>
      </div>
      <Flex>
        <CopyAction data={data} size={20} />
        <ButtonIcon onClick={prevent(togglePreviewMode)} title={t('responsiveView')}>
          {isPhone ? <IconDesktop size={20} /> : <IconPhone size={24} />}
        </ButtonIcon>
        <Button icon={IconCirclePlus} onClick={prevent(() => setAddBlock(0))}>
          {t('addComponent')}
        </Button>
      </Flex>
    </Wrapper>
  )
}

const Wrapper = styled(Flex)({
  marginTop: 0,
  display: 'flex',
  padding: '0 1em',
  flex: 'none',
  backgroundColor: '#FFF',
  borderBottom: '1px solid var(--ve-field-border)',
  boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 2px 0',
  height: 64,
})
