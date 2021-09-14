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
  iconsUrl,
}: {
  definitions: EditorComponentDefinitions
  search: string
  iconsUrl: string
}) {
  return (
    <div class="ve-blocs">
      {Object.keys(definitions)
        .filter(searchDefinition(search, definitions))
        .map((key) => (
          <SidebarBloc
            definition={definitions[key]}
            name={key}
            iconsUrl={iconsUrl}
          />
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
  iconsUrl,
}: {
  name: string
  definition: EditorComponentDefinition
  iconsUrl: string
}) {
  const icon = iconsUrl.replace('[name]', name)
  const title = definition.title
  const { setNodeRef, listeners, attributes, transform, isDragging } =
    useDraggable({
      id: name,
      data: {
        component: SidebarBlocIcon,
        icon,
        title
      }
    })

  return (
    <div class={clsx('ve-bloc-wrapper', isDragging && 'is-dragging')}>
      <div
        class="ve-bloc-draggable"
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        {!isDragging && (
          <SidebarBlocIcon icon={icon} title={title}/>)
        }
      </div>
    </div>
  )
}

function SidebarBlocIcon ({
                            title,
                            icon,
                          }: {
  title: string
  icon: string
}) {
  return <div class="ve-bloc">
    <img src={icon} />
    <span>{title}</span>
  </div>
}
