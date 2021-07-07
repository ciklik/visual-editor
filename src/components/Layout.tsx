import clsx from 'clsx'
import { Sidebar } from './Sidebar'
import { Preview } from './Preview'
import { EditorComponentData, EditorComponentDefinitions } from '../types'
import { DragEndEvent } from '@dnd-kit/core/dist/types'
import { insertItem } from '../functions/array'
import { uniqId } from '../functions/string'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useState } from 'preact/hooks'
import { SidebarModes } from '../constants'
import { useFocusComponent } from '../hooks/useFocusComponent'

type LayoutProps = {
  class?: string
  data: EditorComponentData[]
  previewUrl?: string
  definitions: EditorComponentDefinitions
  onChange: (v: any, path?: string) => void
  onClose: () => void
}

export function Layout({
  class: className,
  data,
  previewUrl,
  definitions,
  onChange,
  onClose,
}: LayoutProps) {
  const [state, setState] = useState(SidebarModes.FIELDS)
  const [_, setFocus] = useFocusComponent()

  // Lorsqu'on ajoute un nouveau bloc
  const handleBlocDrop = (e: DragEndEvent) => {
    const blocName = e.active.id
    const index = e.over?.data?.current?.index
    if (index !== undefined && blocName) {
      const id = blocName + uniqId()
      // On propage le changement de données
      onChange(
        insertItem(data, index, {
          _name: blocName,
          _id: id,
        })
      )
      // On repasse en mode fields
      setState(SidebarModes.FIELDS)
      window.setTimeout(() => setFocus(id), 10)
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
        <Sidebar
          data={data}
          mode={state}
          definitions={definitions}
          onChange={onChange}
          onClose={onClose}
          onModeChange={setState}
        />
        {previewUrl && <Preview data={data} previewUrl={previewUrl} />}
      </div>
    </DndContext>
  )
}
