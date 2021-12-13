import {
  EditorComponentData,
  EditorComponentDefinition,
  EditorField,
} from 'src/types'
import { memo, useCallback, useMemo, useRef } from 'react'
import { useToggle } from 'src/hooks/useToggle'
import { useUpdateEffect } from 'src/hooks/useUpdateEffect'
import { Sortable, SortableWrapper } from 'src/components/Sortable'
import { moveItem } from 'src/functions/array'
import { prevent } from 'src/functions/functions'
import {
  useFieldDefinitions,
  useFieldFocused,
  useRemoveBloc,
  useSetFocusIndex,
  useUpdateData,
} from 'src/store'
import { strToDom } from 'src/functions/dom'
import { IconDown, IconTrash } from 'src/components/ui/Icons'
import { CopyAction } from 'src/components/Sidebar/Actions/CopyAction'
import { AbstractFieldGroup } from 'src/fields/AbstractFieldGroup'
import { SidebarHeading } from './SidebarHeading'

import Styles from './Sidebar.module.scss'
import { ButtonIcon } from '../ui/ButtonIcon'
import { Flex } from '../ui/Flex'
import { SidebarBlocMissing } from './SidebarBlocMissing'

/**
 * Génère la liste des champs dans la sidebar
 */
export function SidebarBlocs({ data }: { data: EditorComponentData[] }) {
  const updateData = useUpdateData()
  const definitions = useFieldDefinitions()
  const handleMove = (from: number, to: number) => {
    updateData(moveItem(data, from, to))
  }

  return (
    <div className={Styles.SidebarBlocs}>
      <SortableWrapper items={data} onMove={handleMove}>
        {data.map((v, k) => (
          <SidebarBloc
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

const SidebarBloc = memo(function SidebarItem({
  data,
  definition,
  path,
}: {
  data: EditorComponentData
  definition?: EditorComponentDefinition
  path: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isFocused = useFieldFocused(data._id)
  const [isCollapsed, toggleCollapsed, setCollapsed] = useToggle(!isFocused)
  const removeBloc = useRemoveBloc()
  const setFocusIndex = useSetFocusIndex()
  const label =
    definition?.label && data[definition.label] ? data[definition.label] : null

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

  const labelHTMLSafe = useMemo(
    () => (label?.includes('<') ? strToDom(label).innerText : label),
    [label]
  )

  const handleRemove = () => {
    removeBloc(data)
  }

  const focusBloc = () => {
    if (isCollapsed) {
      setFocusIndex(path)
    }
    toggleCollapsed()
  }

  if (!definition) {
    return <SidebarBlocMissing data={data} />
  }

  return (
    <Sortable item={data} className={Styles.SidebarBloc}>
      <SidebarHeading
        ref={ref}
        title={definition.title}
        description={isCollapsed ? labelHTMLSafe : null}
        onClick={prevent(focusBloc)}
      >
        <SidebarHeading.Hover>
          <CopyAction data={data} size={20} />
          <ButtonIcon danger onClick={handleRemove} title="Supprimer l'élément">
            <IconTrash size={20} />
          </ButtonIcon>
        </SidebarHeading.Hover>
        <ButtonIcon
          rotate={isCollapsed ? -90 : 0}
          onClick={prevent(toggleCollapsed)}
        >
          <IconDown size={20} />
        </ButtonIcon>
      </SidebarHeading>
      {!isCollapsed && (
        <Flex column gap={1} className={Styles.SidebarBlocBody}>
          <Fields fields={definition.fields} data={data} path={path} />
        </Flex>
      )}
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
          field instanceof AbstractFieldGroup
            ? field.shouldRender(data) && (
                <field.render key={k}>
                  <Fields fields={field.fields} data={data} path={path} />
                </field.render>
              )
            : field.shouldRender(data) && (
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
