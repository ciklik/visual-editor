import {
  EditorComponentData,
  EditorComponentDefinition,
  EditorComponentDefinitions,
  EditorField,
} from '../types'
import { useToggle } from '../hooks/useToggle'
import { useCallback } from 'preact/hooks'
import { hightlightComponent } from '../functions/iframe'
import { Sortable, SortableWrapper } from './Sortable'
import { moveItem } from '../functions/array'

type ChangeCallback = (value: any, path?: string) => void

export function Sidebar({
  content,
  definitions,
  onChange,
}: {
  content: EditorComponentData[]
  definitions: EditorComponentDefinitions
  onChange: ChangeCallback
}) {
  const handleMove = (from: number, to: number) => {
    onChange(moveItem(content, from, to))
  }

  return (
    <div class="ve-sidebar">
      <SortableWrapper items={content} onMove={handleMove}>
        {content.map((c, k) => (
          <SidebarItem
            key={c._index}
            index={k}
            content={c}
            definition={definitions[c.name]}
            path={`${k}.data`}
            onChange={onChange}
          />
        ))}
      </SortableWrapper>
    </div>
  )
}

function SidebarItem({
  content,
  definition,
  path,
  onChange,
  index,
}: {
  content: EditorComponentData
  definition: EditorComponentDefinition
  path: string
  onChange: ChangeCallback
  index: number
}) {
  const [isCollapsed, toggleCollapsed] = useToggle(true)
  const onFocus = () => {
    hightlightComponent(index)
  }

  return (
    <Sortable item={content} class="ve-sidebar-item" onClick={onFocus}>
      <button onClick={toggleCollapsed}>
        <h2 class="ve-sidebar-title">{definition.title}</h2>
        <div class="ve-sidebar-collapse">{isCollapsed ? '+' : '-'}</div>
      </button>
      {!isCollapsed && (
        <div className="ve-sidebar-fields">
          {definition.fields.map((field, k) => (
            <Field
              field={field}
              value={content.data[field.name]}
              path={`${path}.${field.name}`}
              onChange={onChange}
            />
          ))}
        </div>
      )}
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
