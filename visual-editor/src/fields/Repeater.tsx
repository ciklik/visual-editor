import { FieldComponent, FieldDefinition } from 'src/types'
import { deepSet } from 'src/functions/object'
import { moveItem } from 'src/functions/array'
import { textContent, uniqId } from 'src/functions/string'
import { Sortable, SortableWrapper } from 'src/components/Sortable'
import { useToggle } from 'src/hooks/useToggle'
import { prevent } from 'src/functions/functions'
import { fillDefaults } from 'src/functions/fields'
import {
  Button,
  ButtonIcon,
  Field,
  IconCirclePlus,
  IconDown,
  IconTrash,
} from 'src/components/ui'
import { SidebarHeading } from 'src/components/Sidebar/SidebarHeading'
import { FunctionComponent, useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { defineField } from 'src/fields/utils'
import { t } from 'src/functions/i18n'
import { FieldsRenderer } from 'src/components/Sidebar/FieldsRenderer'

type FieldValue = RepeaterLine[]

type FieldArgs = {
  label?: string
  min?: number
  max?: number
  addLabel?: string
  fields: FieldDefinition<any, any>[]
  collapsed?: string
  default?: FieldValue
}

type RepeaterLine = { _id: string; [key: string]: unknown }

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#fff',
  border: '1px solid rgba(0,0,0,0.06)',
  boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
})

const Item = styled(Sortable)({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '.5em',
  padding: '.4rem .7rem .4rem calc(10px + .7rem)',
  borderBottom: 'solid 1px rgba(0,0,0,0.06)',
  backgroundColor: '#fff',
})

const ItemBody = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1em',
})

const Footer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: '.2rem',
  backgroundColor: 'rgba(0,0,0,0.03)',
})

const Component: FieldComponent<FieldArgs, FieldValue> = ({
  value: valueProps,
  onChange,
  options,
}) => {
  const value: RepeaterLine[] = valueProps ?? []
  const canAdd = !options.max || value.length < options.max
  const canRemove = !options.min || value.length > options.min
  const [lastAdditionIndex, setLastAdditionIndex] = useState(-1)

  const add = () => {
    onChange([
      ...value,
      fillDefaults({ _id: uniqId() }, options.fields) as RepeaterLine,
    ])
    setLastAdditionIndex(value.length)
  }

  const remove = (line: Object) => {
    onChange(value.filter((v) => v !== line))
  }

  const updateProperty = (v: unknown, path: string) => {
    onChange(deepSet(value, path, v))
  }

  function handleMove(from: number, to: number) {
    onChange(moveItem(value, from, to))
  }

  return (
    <Field label={options.label}>
      <SortableWrapper items={value} onMove={handleMove}>
        <Wrapper>
          {value.map((line, k) => (
            <FieldLine
              key={line._id}
              line={line}
              index={k}
              onUpdate={updateProperty}
              onRemove={canRemove ? remove : null}
              options={options}
              defaultCollapsed={lastAdditionIndex !== k}
            />
          ))}
          {canAdd && (
            <Footer>
              <Button secondary onClick={prevent(add)} icon={IconCirclePlus}>
                {options.addLabel}
              </Button>
            </Footer>
          )}
        </Wrapper>
      </SortableWrapper>
    </Field>
  )
}

const FieldLine: FunctionComponent<{
  line: RepeaterLine
  index: number
  onRemove: null | ((line: RepeaterLine) => void)
  onUpdate: (v: unknown, path: string) => void
  options: FieldArgs
  defaultCollapsed: boolean
}> = ({ line, index, onRemove, onUpdate, options, defaultCollapsed }) => {
  const [collapsed, toggleCollapsed] = useToggle(defaultCollapsed)

  const title = options.collapsed
    ? (line[options.collapsed] as string)
    : `#${index + 1}`
  const escapedTitle = useMemo(() => textContent(title), [title])

  return (
    <Item item={line}>
      <SidebarHeading onClick={prevent(toggleCollapsed)} title={escapedTitle}>
        <SidebarHeading.Hover>
          {onRemove && (
            <ButtonIcon
              danger
              onClick={() => onRemove(line)}
              title={t('deleteItem')}
            >
              <IconTrash size={20} />
            </ButtonIcon>
          )}
        </SidebarHeading.Hover>
        <ButtonIcon
          rotate={collapsed ? -90 : 0}
          onClick={prevent(toggleCollapsed)}
        >
          <IconDown size={24} />
        </ButtonIcon>
      </SidebarHeading>
      {!collapsed && (
        <ItemBody>
          <FieldsRenderer
            fields={options.fields}
            data={line}
            onUpdate={onUpdate}
            path={index.toString()}
          />
        </ItemBody>
      )}
    </Item>
  )
}

export const Repeater = defineField<FieldArgs, FieldValue>(() => ({
  defaultOptions: { addLabel: t('addItem'), fields: [], default: [] },
  render: Component,
}))
