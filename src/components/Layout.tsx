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
import { useInsertData, useSidebarWidth } from 'src/store'
import { useState } from 'preact/hooks'
import { ResizeBar } from './ResizeBar'
import { useThrottle } from 'react-use'
import { ComponentChildren } from 'preact'
import { fillDefaults } from '../functions/fields'

type LayoutProps = {
  class?: string
  data: EditorComponentData[]
  previewUrl?: string
  definitions: EditorComponentDefinitions
  onClose: () => void
  iconsUrl: string
}

export function Layout({
  class: className,
  data,
  previewUrl,
  definitions,
  onClose,
  iconsUrl,
}: LayoutProps) {
  const insertData = useInsertData()
  const [isDragging, setIsDragging] = useState(false)

  // Lorsqu'on ajoute un nouveau bloc
  const handleBlocDrop = (e: DragEndEvent) => {
    setIsDragging(false)
    const blocName = e.active.id
    const index = e.over?.data?.current?.index
    if (index !== undefined && blocName) {
      insertData(
        blocName,
        index,
        fillDefaults({}, definitions[blocName].fields)
      )
    }
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = () => {
    setIsDragging(true)
  }

  return (
    <Wrapper>
      <DndContext
        sensors={sensors}
        onDragEnd={handleBlocDrop}
        onDragStart={handleDragStart}
      >
        <div class={clsx('ve-layout', isDragging && 'is-dragging', className)}>
          <Sidebar
            data={data}
            definitions={definitions}
            onClose={onClose}
            iconsUrl={iconsUrl}
          />
          {previewUrl && <Preview data={data} previewUrl={previewUrl} />}
        </div>
      </DndContext>
      <ResizeBar />
    </Wrapper>
  )
}

function Wrapper({ children }: { children: ComponentChildren }) {
  const sidebarWidth = useSidebarWidth()

  return (
    <div class="ve-wrapper" style={{ '--sidebar': `${sidebarWidth}vw` }}>
      {children}
    </div>
  )
}
