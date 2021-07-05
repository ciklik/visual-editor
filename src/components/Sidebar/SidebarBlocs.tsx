import {
  EditorComponentDefinition,
  EditorComponentDefinitions,
} from '../../types'

export function SidebarBlocs({
  definitions,
}: {
  definitions: EditorComponentDefinitions
}) {
  console.log(definitions)
  return (
    <div class="ve-blocs">
      {Object.keys(definitions).map((key) => (
        <SidebarBloc definition={definitions[key]} name={key} />
      ))}
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
  return (
    <div class="ve-bloc">
      <img src={'/' + name + '.svg'} />
      {definition.title}
    </div>
  )
}
