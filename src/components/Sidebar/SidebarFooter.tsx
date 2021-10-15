import { prevent } from 'src/functions/functions'
import { PreviewModes, usePreviewMode, useTogglePreviewMode } from 'src/store'
import { IconDesktop, IconPhone } from 'src/components/Icons'
import { CopyPage } from './Actions/CopyPage'

type SidebarFooterProps = {
  onClose: () => void
}

export function SidebarFooter({ onClose }: SidebarFooterProps) {
  const togglePreviewMode = useTogglePreviewMode()
  const previewMode = usePreviewMode()
  const isPhone = previewMode === PreviewModes.PHONE

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
    </div>
  )
}
