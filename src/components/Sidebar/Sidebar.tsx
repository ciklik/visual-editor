import { EditorComponentData, EditorComponentDefinitions } from 'src/types'
import { SidebarFields } from 'src/components/Sidebar/SidebarFields'
import { SidebarBlocs } from 'src/components/Sidebar/SidebarBlocs'
import { SidebarModes } from 'src/constants'
import { useSidebarMode } from 'src/store'
import { useState } from 'preact/hooks'
import { SidebarFooter } from 'src/components/Sidebar/SidebarFooter'

export function Sidebar({
  data,
  definitions,
  onClose,
  iconsUrl,
}: {
  data: EditorComponentData[]
  definitions: EditorComponentDefinitions
  onClose: () => void
  iconsUrl: string
}) {
  const mode = useSidebarMode()
  const [search, setSearch] = useState('')

  return (
    <div class="ve-sidebar">
      <SidebarFooter onClose={onClose} onSearch={setSearch} search={search} />
      {mode === SidebarModes.FIELDS && (
        <SidebarFields data={data} definitions={definitions} />
      )}
      {mode === SidebarModes.BLOCS && (
        <SidebarBlocs
          definitions={definitions}
          search={search}
          iconsUrl={iconsUrl}
        />
      )}
    </div>
  )
}
