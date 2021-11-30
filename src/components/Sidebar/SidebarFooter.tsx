import { prevent } from 'src/functions/functions'
import { PreviewModes, usePreviewMode, useSetBlockIndex, useTogglePreviewMode } from 'src/store'
import { IconCirclePlus, IconDesktop, IconPhone } from 'src/components/Icons'
import { CopyPage } from './Actions/CopyPage'
import { Button } from '../ui/Button'

type SidebarFooterProps = {
  onClose: () => void
}

export function SidebarFooter({ onClose }: SidebarFooterProps) {
  const togglePreviewMode = useTogglePreviewMode()
  const previewMode = usePreviewMode()
  const isPhone = previewMode === PreviewModes.PHONE
  const setAddBlock = useSetBlockIndex()

  return (
    <div class="ve-sidebar-footer">
      <button class="ve-close" onClick={prevent(onClose)} title="Fermer">
        &times;
      </button>
      <div class="ve-row">
        <CopyPage class="ve-copy-page" />
        <button class="ve-preview-toggle" onClick={prevent(togglePreviewMode)}>
          {isPhone ? <IconDesktop size={24} /> : <IconPhone size={24} />}
        </button>
      </div>
      <Button icon={IconCirclePlus} onClick={() => setAddBlock(0)}>
        Ajouter un bloc
      </Button>
    </div>
  )
}
