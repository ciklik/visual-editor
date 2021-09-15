import {
  EditorComponentData,
  EditorComponentDefinition,
  EditorComponentDefinitions,
  EditorField,
} from 'src/types'
import { useCallback, useMemo, useRef } from 'preact/hooks'
import { useToggle } from 'src/hooks/useToggle'
import { useUpdateEffect } from 'src/hooks/useUpdateEffect'
import { Sortable, SortableWrapper } from 'src/components/Sortable'
import { moveItem } from 'src/functions/array'
import { prevent } from 'src/functions/functions'
import { useFieldFocused, useRemoveBloc, useUpdateData } from 'src/store'
import { memo } from 'preact/compat'
import { strToDom } from 'src/functions/dom'
import { IconChevron } from 'src/components/Icons'
import clsx from 'clsx'
import { CopyAction } from 'src/components/Sidebar/Actions/CopyAction'
import { AbstractFieldGroup } from 'src/fields/AbstractFieldGroup'

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
  const removeBloc = useRemoveBloc()
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
          ref.current!.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        100
      )
    } else {
      setCollapsed(true)
    }
  }, [isFocused])
  const title = useMemo(
    () => (label.includes('<') ? strToDom(label).innerText : label),
    [label]
  )

  const handleRemove = () => {
    removeBloc(data)
  }

  return (
    <Sortable item={data} class="ve-sidebar-bloc">
      <button
        class="ve-bloc-remove"
        onClick={handleRemove}
        title="Supprimer l'élément"
      >
        &times;
      </button>
      <div ref={ref}>
        <div className="ve-sidebar-bloc__head">
          <h2 class="ve-sidebar-title" onClick={prevent(toggleCollapsed)}>
            {title}
          </h2>
          <div class="ve-sidebar-actions">
            <CopyAction data={data} />
            <button
              class={clsx(!isCollapsed && 've-sidebar-expanded')}
              onClick={prevent(toggleCollapsed)}
            >
              <IconChevron size={14} />
            </button>
          </div>
        </div>
        {!isCollapsed && (
          <div className="ve-sidebar-fields">
            <Fields fields={definition.fields} data={data} path={path} />
          </div>
        )}
      </div>
    </Sortable>
  )
})

function Fields({
  fields,
  data,
  path,
}: {
  fields: EditorComponentDefinition['fields']
  data: EditorComponentData
  path: string
}) {
  return (
    <>
      {fields
        .filter((field) => field.shouldRender(data))
        .map((field, k) =>
          field instanceof AbstractFieldGroup ? (
            <field.render>
              <Fields fields={field.fields} data={data} path={path} />
            </field.render>
          ) : (
            <Field
              key={field.name}
              field={field}
              value={field.name ? data[field.name] : undefined}
              path={`${path}.${field.name}`}
              style={field.injectStyle(data)}
            />
          )
        )}
    </>
  )
}

function Field({
  field,
  value,
  path,
  style,
}: {
  field: EditorField<any>
  value: string
  path: string
  style: Record<string, string> | null
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
    <div style={style as any}>
      <Component value={value} onChange={onChangeCallback} />
    </div>
  )
}
