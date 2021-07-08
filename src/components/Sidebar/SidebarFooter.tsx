import { prevent } from 'src/functions/functions'
import { SidebarModes } from 'src/constants'
import { useSetSidebarMode, useSidebarMode } from 'src/store'
import { useEffect, useRef } from 'preact/hooks'
import { EventWithTarget } from 'src/types'

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
      <button class="ve-button" onClick={prevent(toggleMode)}>
        {mode === SidebarModes.BLOCS ? 'Revenir au contenu' : 'Ajouter un bloc'}
      </button>
    </div>
  )
}
