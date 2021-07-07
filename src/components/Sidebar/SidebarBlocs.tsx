import {
  EditorComponentDefinition,
  EditorComponentDefinitions,
} from '../../types'
import { CSS } from '@dnd-kit/utilities'
import { useDraggable } from '@dnd-kit/core'

export function SidebarBlocs({
  definitions,
}: {
  definitions: EditorComponentDefinitions
}) {
  return (
    <div>
      <div class="ve-blocs">
        {Object.keys(definitions).map((key) => (
          <SidebarBloc definition={definitions[key]} name={key} />
        ))}
      </div>
    </div>
  )
}

function SidebarBloc({
  definition,
  name,
}: {
  name: string
  definition: EditorComponentDefinition
}) {
  const { setNodeRef, listeners, attributes, transform } = useDraggable({
    id: name,
  })
  const style = {
    transform: CSS.Translate.toString(transform),
  }
  return (
    <div style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <div class="ve-bloc">
        <img src={'/' + name + '.svg'} />
        {definition.title}
      </div>
    </div>
  )
}
