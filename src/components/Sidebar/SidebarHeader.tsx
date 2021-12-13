import { prevent } from 'src/functions/functions'
import {
  PreviewModes,
  useData,
  usePreviewMode,
  useSetBlockIndex,
  useTogglePreviewMode,
} from 'src/store'
import {
  IconBack,
  IconCirclePlus,
  IconCross,
  IconDesktop,
  IconPhone,
} from 'src/components/ui/Icons'
import { Button } from '../ui/Button'
import { ButtonIcon } from '../ui/ButtonIcon'
import { CopyAction } from './Actions/CopyAction'
import { Flex } from '../ui/Flex'

import Styles from './Sidebar.module.scss'

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
    <Flex className={Styles.SidebarHeader} between>
      <div>
        <ButtonIcon title="Fermer" onClick={prevent(onClose)}>
          <IconCross size={12} />
        </ButtonIcon>
      </div>
      <Flex>
        <CopyAction data={data} size={20} />
        <ButtonIcon onClick={prevent(togglePreviewMode)} title="Vue responsive">
          {isPhone ? <IconDesktop size={20} /> : <IconPhone size={24} />}
        </ButtonIcon>
        <Button icon={IconCirclePlus} onClick={prevent(() => setAddBlock(0))}>
          Ajouter un bloc
        </Button>
      </Flex>
    </Flex>
  )
}
