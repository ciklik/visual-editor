import { EditorComponentData, EditorComponentDefinitions } from '../types'
import { SidebarFields } from './Sidebar/SidebarFields'
import { useState } from 'preact/hooks'
import { SidebarBlocs } from './Sidebar/SidebarBlocs'
import { prevent } from '../functions/functions'

type ChangeCallback = (value: any, path?: string) => void

enum State {
  FIELDS,
  BLOCS,
}

export function Sidebar({
  data,
  definitions,
  onChange,
  onClose,
}: {
  data: EditorComponentData[]
  definitions: EditorComponentDefinitions
  onChange: ChangeCallback
  onClose: () => void
}) {
  const [state, setState] = useState(State.FIELDS)
  const toggleState = () => {
    setState((v) => (v === State.BLOCS ? State.FIELDS : State.BLOCS))
  }

  return (
    <div class="ve-sidebar">
      <div class="ve-sidebar-footer">
        <button class="ve-button" onClick={prevent(onClose)}>
          Fermer
        </button>
        <button class="ve-button" onClick={prevent(toggleState)}>
          {state === State.BLOCS ? 'Revenir au contenu' : 'Ajouter un bloc'}
        </button>
      </div>
      {state === State.FIELDS && (
        <SidebarFields
          data={data}
          onChange={onChange}
          definitions={definitions}
        />
      )}
      {state === State.BLOCS && <SidebarBlocs definitions={definitions} />}
    </div>
  )
}
