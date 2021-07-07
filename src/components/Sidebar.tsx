import { EditorComponentData, EditorComponentDefinitions } from '../types'
import { SidebarFields } from './Sidebar/SidebarFields'
import { SidebarBlocs } from './Sidebar/SidebarBlocs'
import { prevent } from '../functions/functions'
import { SidebarModes } from '../constants'

export function Sidebar({
  data,
  definitions,
  onChange,
  onClose,
  mode,
  onModeChange,
}: {
  data: EditorComponentData[]
  definitions: EditorComponentDefinitions
  onChange: (value: any, path?: string) => void
  mode: SidebarModes
  onClose: () => void
  onModeChange: (mode: SidebarModes) => void
}) {
  const toggleMode = () => {
    onModeChange(
      mode === SidebarModes.FIELDS ? SidebarModes.BLOCS : SidebarModes.FIELDS
    )
  }

  return (
    <div class="ve-sidebar">
      <div class="ve-sidebar-footer">
        <button class="ve-close" onClick={prevent(onClose)} title="Fermer">
          &times;
        </button>
        <button class="ve-button" onClick={prevent(toggleMode)}>
          {mode === SidebarModes.BLOCS
            ? 'Revenir au contenu'
            : 'Ajouter un bloc'}
        </button>
      </div>
      {mode === SidebarModes.FIELDS && (
        <SidebarFields
          data={data}
          onChange={onChange}
          definitions={definitions}
        />
      )}
      {mode === SidebarModes.BLOCS && (
        <SidebarBlocs definitions={definitions} />
      )}
    </div>
  )
}
