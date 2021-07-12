import clsx from 'clsx'
import { Sidebar } from 'src/components/Sidebar/Sidebar'
import { Preview } from 'src/components/Preview'
import { EditorComponentData, EditorComponentDefinitions } from 'src/types'
import { DragEndEvent } from '@dnd-kit/core/dist/types'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useInsertData } from 'src/store'

type LayoutProps = {
  class?: string
  data: EditorComponentData[]
  previewUrl?: string
  definitions: EditorComponentDefinitions
  onClose: () => void
}

export function Layout({
  class: className,
  data,
  previewUrl,
  definitions,
  onClose,
}: LayoutProps) {
  const insertData = useInsertData()

  // Lorsqu'on ajoute un nouveau bloc
  const handleBlocDrop = (e: DragEndEvent) => {
    const blocName = e.active.id
    const index = e.over?.data?.current?.index
    if (index !== undefined && blocName) {
      insertData(blocName, index)
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <DndContext sensors={sensors} onDragEnd={handleBlocDrop}>
      <div class={clsx('ve-layout', className)}>
        <Sidebar data={data} definitions={definitions} onClose={onClose} />
        {previewUrl && <Preview data={data} previewUrl={previewUrl} />}
      </div>
    </DndContext>
  )
}
