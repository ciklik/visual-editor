import { EditorComponentData, EditorComponentDefinitions } from '../types'
import { SidebarFields } from './Sidebar/SidebarFields'
import { SidebarBlocs } from './Sidebar/SidebarBlocs'
import { prevent } from '../functions/functions'
import { SidebarModes } from '../constants'
import { useData, useSetSidebarMode, useSidebarMode } from '../store'
import { useEffect, useRef, useState } from 'preact/hooks'

export function Sidebar({
  data,
  definitions,
  onClose,
}: {
  data: EditorComponentData[]
  definitions: EditorComponentDefinitions
  onClose: () => void
}) {
  const searchField = useRef<HTMLInputElement>(null)
  const mode = useSidebarMode()
  const setMode = useSetSidebarMode()
  const [search, setSearch] = useState('')

  const toggleMode = () => {
    setSearch('')
    setMode(
      mode === SidebarModes.FIELDS ? SidebarModes.BLOCS : SidebarModes.FIELDS
    )
  }

  useEffect(() => {
    if (mode === SidebarModes.BLOCS) {
      searchField.current?.focus()
    }
  }, [mode])

  return (
    <div class="ve-sidebar">
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
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
        )}
        <button class="ve-button" onClick={prevent(toggleMode)}>
          {mode === SidebarModes.BLOCS
            ? 'Revenir au contenu'
            : 'Ajouter un bloc'}
        </button>
      </div>
      {mode === SidebarModes.FIELDS && (
        <SidebarFields data={data} definitions={definitions} />
      )}
      {mode === SidebarModes.BLOCS && (
        <SidebarBlocs definitions={definitions} search={search} />
      )}
    </div>
  )
}

function Demo() {
  console.log('Demo rerendered')
  return <div>{JSON.stringify(useData())}</div>
}
