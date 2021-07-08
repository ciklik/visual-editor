import {
  EditorComponentDefinition,
  EditorComponentDefinitions,
} from 'src/types'
import { CSS } from '@dnd-kit/utilities'
import { useDraggable } from '@dnd-kit/core'
import clsx from 'clsx'

export function SidebarBlocs({
  definitions,
  search,
}: {
  definitions: EditorComponentDefinitions
  search: string
}) {
  return (
    <div class="ve-blocs">
      {Object.keys(definitions)
        .filter(searchDefinition(search, definitions))
        .map((key) => (
          <SidebarBloc definition={definitions[key]} name={key} />
        ))}
    </div>
  )
}

function searchDefinition(
  search: string,
  definitions: EditorComponentDefinitions
) {
  if (search === '') {
    return () => true
  }
  return (key: string) => definitions[key].title.toLowerCase().includes(search)
}

function SidebarBloc({
  definition,
  name,
}: {
  name: string
  definition: EditorComponentDefinition
}) {
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({
      id: name,
    })
  const style = {
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div class={clsx('ve-bloc-wrapper', isDragging && 'is-dragging')}>
      <div
        class="ve-bloc-draggable"
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <div class="ve-bloc">
          <img src={'/' + name + '.svg'} />
          {definition.title}
        </div>
      </div>
    </div>
  )
}
