import { EditorComponentData } from 'src/types'
import { SortableWrapper } from 'src/components/Sortable'
import { moveItem } from 'src/functions/array'
import { useFieldDefinitions, useUpdateData } from 'src/store'

import Styles from './Sidebar.module.scss'
import { SidebarBloc } from './SidebarBloc'

/**
 * Génère la liste des champs dans la sidebar
 */
export function SidebarBlocs({ data }: { data: EditorComponentData[] }) {
  const updateData = useUpdateData()
  const definitions = useFieldDefinitions()
  const handleMove = (from: number, to: number) => {
    updateData(moveItem(data, from, to))
  }

  return (
    <div className={Styles.SidebarBlocs}>
      <SortableWrapper items={data} onMove={handleMove}>
        {data.map((v, k) => (
          <SidebarBloc
            key={v._id}
            data={v}
            definition={definitions[v._name]}
            path={`${k}`}
          />
        ))}
      </SortableWrapper>
    </div>
  )
}
