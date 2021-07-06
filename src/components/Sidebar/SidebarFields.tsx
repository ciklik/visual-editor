import {
  EditorComponentData,
  EditorComponentDefinition,
  EditorComponentDefinitions,
  EditorField,
} from '../../types'
import { useCallback, useRef } from 'preact/hooks'
import { useToggle } from '../../hooks/useToggle'
import { useFocusComponent } from '../../hooks/useFocusComponent'
import { useUpdateEffect } from '../../hooks/useUpdateEffect'
import { Sortable, SortableWrapper } from '../Sortable'
import { moveItem } from '../../functions/array'
import { prevent } from '../../functions/functions'

type ChangeCallback = (value: any, path?: string) => void

/**
 * Génère la liste des champs dans la sidebar
 */
export function SidebarFields({
  data,
  onChange,
  definitions,
}: {
  data: EditorComponentData[]
  onChange: ChangeCallback
  definitions: EditorComponentDefinitions
}) {
  const handleMove = (from: number, to: number) => {
    onChange(moveItem(data, from, to))
  }

  return (
    <div class="ve-fields">
      <SortableWrapper items={data} onMove={handleMove}>
        {data.map((v, k) => (
          <SidebarItem
            key={v._index}
            data={v}
            definition={definitions[v.name]}
            path={`${k}.data`}
            onChange={onChange}
          />
        ))}
      </SortableWrapper>
    </div>
  )
}

function SidebarItem({
  data,
  definition,
  path,
  onChange,
}: {
  data: EditorComponentData
  definition: EditorComponentDefinition
  path: string
  onChange: ChangeCallback
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isCollapsed, toggleCollapsed, setCollapsed] = useToggle(true)
  const [focusedIndex] = useFocusComponent()
  const isFocused = focusedIndex === data._index
  const label =
    definition.label && data.data[definition.label]
      ? definition.title + ' : ' + data.data[definition.label]
      : definition.title

  // Scroll vers l'élément lorsqu'il a le focus
  useUpdateEffect(() => {
    if (isFocused) {
      window.setTimeout(
        () =>
          ref.current!.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
        100
      )
    }
    setCollapsed(!isFocused)
  }, [focusedIndex, isFocused])

  return (
    <Sortable item={data} class="ve-sidebar-item">
      <div ref={ref}>
        <button onClick={prevent(toggleCollapsed)}>
          <h2 class="ve-sidebar-title">{label}</h2>
          <div class="ve-sidebar-collapse">{isCollapsed ? '+' : '-'}</div>
        </button>
        {!isCollapsed && (
          <div className="ve-sidebar-fields">
            {definition.fields.map((field, k) => (
              <Field
                field={field}
                value={data.data[field.name]}
                path={`${path}.${field.name}`}
                onChange={onChange}
              />
            ))}
          </div>
        )}
      </div>
    </Sortable>
  )
}

function Field({
  field,
  value,
  onChange,
  path,
}: {
  field: EditorField<any>
  value: string
  onChange: ChangeCallback
  path: string
}) {
  const Component = field.field
  const onChangeCallback = useCallback(
    (value: any) => {
      onChange(value, path)
    },
    [path]
  )
  return (
    <>
      <Component value={value} onChange={onChangeCallback} />
    </>
  )
}
