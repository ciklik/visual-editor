import React, { ReactNode, SyntheticEvent } from 'react'
import { IndexableObject } from 'src/types'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { DragEndEvent } from '@dnd-kit/core/dist/types'
import { DragHandle } from 'src/components/ui'

type SortableWrapperProps = {
  items: IndexableObject[]
  children: ReactNode
  onMove: (from: number, to: number) => void
}

export function SortableWrapper({
  items,
  children,
  onMove,
}: SortableWrapperProps) {
  const ids = items.map((item) => item._id)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      onMove(ids.indexOf(active.id.toString()), ids.indexOf(over.id.toString()))
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <SortableContext items={ids} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}

type SortableProps = {
  item: IndexableObject
  children: ReactNode
  className?: string
  onClick?: (e: SyntheticEvent) => void
}

export function Sortable({
  item,
  children,
  className,
  ...props
}: SortableProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item._id })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition: transition || undefined,
  }
  return (
    <div
      className={className}
      data-dragging={isDragging ? true : undefined}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...props}
    >
      <DragHandle {...listeners} />
      {children}
    </div>
  )
}
