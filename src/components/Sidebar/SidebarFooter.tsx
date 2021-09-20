import { prevent } from 'src/functions/functions'
import { PHONE_HEIGHT, SidebarModes } from 'src/constants'
import {
  PreviewModes,
  usePreviewMode,
  useSetSidebarMode,
  useSidebarMode,
  useTogglePreviewMode,
} from 'src/store'
import { useEffect, useRef } from 'preact/hooks'
import { EventWithTarget } from 'src/types'
import { IconCopy, IconDesktop, IconPhone } from 'src/components/Icons'
import { useWindowSize } from 'react-use'
import { CopyPage } from './Actions/CopyPage'

type SidebarFooterProps = {
  onClose: () => void
  onSearch: (s: string) => void
  search: string
}

export function SidebarFooter({
  onClose,
  onSearch,
  search,
}: SidebarFooterProps) {
  const searchField = useRef<HTMLInputElement>(null)
  const mode = useSidebarMode()
  const setMode = useSetSidebarMode()

  useEffect(() => {
    if (mode === SidebarModes.BLOCS) {
      searchField.current?.focus()
    }
  }, [mode])

  const toggleMode = () => {
    onSearch('')
    setMode(
      mode === SidebarModes.FIELDS ? SidebarModes.BLOCS : SidebarModes.FIELDS
    )
  }

  const togglePreviewMode = useTogglePreviewMode()
  const previewMode = usePreviewMode()
  const { height: windowHeight } = useWindowSize()
  let transform = null

  if (previewMode === PreviewModes.PHONE && windowHeight < 940) {
    transform = { transform: `scale(${windowHeight / PHONE_HEIGHT})` }
  }
  const isPhone = previewMode === PreviewModes.PHONE

  return (
    <div class="ve-sidebar-footer">
      <button class="ve-close" onClick={prevent(onClose)} title="Fermer">
        &times;
      </button>

      {mode === SidebarModes.BLOCS && (
        <input
          ref={searchField}
          type="text"
          class="ve-bloc-search"
          autofocus
          onChange={prevent((e: EventWithTarget<HTMLInputElement>) =>
            onSearch(e.target.value)
          )}
          value={search}
        />
      )}
      <div class="ve-row">
        <CopyPage class="ve-copy-page" />
        <button class="ve-preview-toggle" onClick={prevent(togglePreviewMode)}>
          {isPhone ? <IconDesktop size={24} /> : <IconPhone size={24} />}
        </button>
        <button class="ve-button" onClick={prevent(toggleMode)}>
          {mode === SidebarModes.BLOCS
            ? 'Revenir au contenu'
            : 'Ajouter un bloc'}
        </button>
      </div>
    </div>
  )
}
