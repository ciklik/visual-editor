import {
  EditorComponentData,
  EditorComponentDefinition,
  EditorComponentDefinitions,
  EditorField,
} from 'src/types'
import { useCallback, useMemo, useRef } from 'preact/hooks'
import { useToggle } from 'src/hooks/useToggle'
import { useUpdateEffect } from 'src/hooks/useUpdateEffect'
import { Sortable, SortableWrapper } from '../Sortable'
import { moveItem } from 'src/functions/array'
import { prevent } from 'src/functions/functions'
import { useFieldFocused, useUpdateData } from 'src/store'
import { memo } from 'preact/compat'
import { strToDom } from 'src/functions/dom'

/**
 * Génère la liste des champs dans la sidebar
 */
export function SidebarFields({
  data,
  definitions,
}: {
  data: EditorComponentData[]
  definitions: EditorComponentDefinitions
}) {
  const updateData = useUpdateData()
  const handleMove = (from: number, to: number) => {
    updateData(moveItem(data, from, to))
  }

  return (
    <div class="ve-fields">
      <SortableWrapper items={data} onMove={handleMove}>
        {data.map((v, k) => (
          <SidebarItem
            key={v._id}
            data={v}
            definition={definitions[v._name]}
            path={`${k}`}
          />
        ))}
      </SortableWrapper>
    </div>
  )
}

const SidebarItem = memo(function SidebarItem({
  data,
  definition,
  path,
}: {
  data: EditorComponentData
  definition: EditorComponentDefinition
  path: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isFocused = useFieldFocused(data._id)
  const [isCollapsed, toggleCollapsed, setCollapsed] = useToggle(!isFocused)
  const label =
    definition.label && data[definition.label]
      ? definition.title + ' : ' + data[definition.label]
      : definition.title

  // Scroll vers l'élément lorsqu'il a le focus
  useUpdateEffect(() => {
    if (isFocused) {
      setCollapsed(false)
      window.setTimeout(
        () =>
          ref.current!.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
        100
      )
    }
  }, [isFocused])
  const title = useMemo(
    () => (label.includes('<') ? strToDom(label).innerText : label),
    [label]
  )

  return (
    <Sortable item={data} class="ve-sidebar-item">
      <div ref={ref}>
        <button onClick={prevent(toggleCollapsed)}>
          <h2 class="ve-sidebar-title">{title}</h2>
          <div class="ve-sidebar-collapse">{isCollapsed ? '+' : '-'}</div>
        </button>
        {!isCollapsed && (
          <div className="ve-sidebar-fields">
            {definition.fields.map((field, k) => (
              <Field
                field={field}
                value={data[field.name]}
                path={`${path}.${field.name}`}
              />
            ))}
          </div>
        )}
      </div>
    </Sortable>
  )
})

function Field({
  field,
  value,
  path,
}: {
  field: EditorField<any>
  value: string
  path: string
}) {
  const updateData = useUpdateData()
  const Component = field.field
  const onChangeCallback = useCallback(
    (value: any) => {
      updateData(value, path)
    },
    [path]
  )
  return (
    <>
      <Component value={value} onChange={onChangeCallback} />
    </>
  )
}
