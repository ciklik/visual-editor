import { IndexableObject } from '../types'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  restrictToParentElement,
  restrictToVerticalAxis
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { DragEndEvent } from '@dnd-kit/core/dist/types'
import { ComponentChildren } from 'preact'

export function SortableWrapper ({items, children, onMove}: {items: IndexableObject[], children: ComponentChildren, onMove: (from: number, to: number) => void}) {
  const ids = items.map(item => item._index)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  function handleDragEnd (event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      onMove(ids.indexOf(active.id), ids.indexOf(over.id))
    }
  }

  return <DndContext
    sensors={sensors}
    collisionDetection={closestCenter}
    onDragEnd={handleDragEnd}
    modifiers={[restrictToVerticalAxis, restrictToParentElement]}
  >
    <SortableContext
      items={ids}
      strategy={verticalListSortingStrategy}
    >
      {children}
    </SortableContext>
  </DndContext>
}

export function Sortable ({item, children, ...props}: {item: IndexableObject, children: ComponentChildren, class?: string, onClick?: (e:Event) => void}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: item._index });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition
  };
  return <div
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...props}>
    <div class="ve-repeater-handle"
         {...listeners}/>
    {children}
  </div>
}
