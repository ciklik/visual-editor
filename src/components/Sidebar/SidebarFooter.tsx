import { prevent } from 'src/functions/functions'
import { PreviewModes, usePreviewMode, useSetBlockIndex, useTogglePreviewMode } from 'src/store'
import { IconCirclePlus, IconDesktop, IconPhone } from 'src/components/Icons'
import { CopyPage } from './Actions/CopyPage'
import { Button } from '../ui/Button'
import React from 'react'

type SidebarFooterProps = {
  onClose: () => void
}

export function SidebarFooter({ onClose }: SidebarFooterProps) {
  const togglePreviewMode = useTogglePreviewMode()
  const previewMode = usePreviewMode()
  const isPhone = previewMode === PreviewModes.PHONE
  const setAddBlock = useSetBlockIndex()

  return (
    <div className="ve-sidebar-footer">
      <button className="ve-close" onClick={prevent(onClose)} title="Fermer">
        &times;
      </button>
      <div className="ve-row">
        <CopyPage className="ve-copy-page" />
        <button className="ve-preview-toggle" onClick={prevent(togglePreviewMode)}>
          {isPhone ? <IconDesktop size={24} /> : <IconPhone size={24} />}
        </button>
      </div>
      <Button icon={IconCirclePlus} onClick={() => setAddBlock(0)}>
        Ajouter un bloc
      </Button>
    </div>
  )
}
