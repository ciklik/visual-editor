import { EditorField, EditorFieldProps } from 'src/types'
import { deepSet, indexify } from 'src/functions/object'
import { moveItem } from 'src/functions/array'
import { textContent, uniqId } from 'src/functions/string'
import { AbstractField } from 'src/fields/AbstractField'
import { Sortable, SortableWrapper } from 'src/components/Sortable'
import { useToggle } from 'src/hooks/useToggle'
import { prevent } from 'src/functions/functions'
import { fillDefaults } from 'src/functions/fields'
import { AbstractFieldGroup } from './AbstractFieldGroup'
import {
  Button,
  ButtonIcon,
  Field,
  Flex,
  IconCirclePlus,
  IconDown,
  IconTrash,
} from 'src/components/ui'
import { SidebarHeading } from 'src/components/Sidebar/SidebarHeading'
import { useMemo } from 'react'
import styled from '@emotion/styled'

type FieldType = EditorField<any> | AbstractFieldGroup<any>

type FieldArgs = {
  label?: string
  min?: number
  max?: number
  addLabel?: string
  fields: FieldType[]
  collapsed?: string
}

type RepeaterLine = { _id: string; [key: string]: unknown }

/**
 * Permet de créer une liste de champs imbriqués
 */
export class Repeater extends AbstractField<FieldArgs, RepeaterLine[]> {
  get defaultArgs() {
    return { addLabel: 'Ajouter un élément' }
  }

  get defaultValue() {
    const value = []
    const min = this.args.min ?? 0
    for (let i = 0; i < min; i++) {
      value.push(fillDefaults({}, this.args.fields))
    }
    return indexify(value)
  }

  public field = ({
    value: valueProps,
    onChange,
  }: EditorFieldProps<RepeaterLine[]>) => {
    const value: RepeaterLine[] = valueProps ?? []
    const canAdd = !this.args.max || value.length < this.args.max
    const canRemove = !this.args.min || value.length > this.args.min

    const add = () => {
      onChange([
        ...value,
        fillDefaults({ _id: uniqId() }, this.args.fields) as RepeaterLine,
      ])
    }

    const remove = (line: Object) => {
      onChange(value.filter((v) => v !== line))
    }

    const updateProperty = (path: string, v: unknown) => {
      onChange(deepSet(value, path, v))
    }

    function handleMove(from: number, to: number) {
      onChange(moveItem(value, from, to))
    }

    return (
      <Field label={this.args.label}>
        <SortableWrapper items={value} onMove={handleMove}>
          <Wrapper>
            {value.map((line, k) => (
              <this.fieldLine
                key={line._id}
                line={line}
                index={k}
                onUpdate={updateProperty}
                onRemove={canRemove ? remove : null}
              />
            ))}
            {canAdd && (
              <Footer>
                <Button secondary onClick={prevent(add)} icon={IconCirclePlus}>
                  {this.args.addLabel}
                </Button>
              </Footer>
            )}
          </Wrapper>
        </SortableWrapper>
      </Field>
    )
  }

  private fieldLine = ({
    line,
    index,
    onRemove,
    onUpdate,
  }: {
    line: RepeaterLine
    index: number
    onRemove: null | ((line: RepeaterLine) => void)
    onUpdate: (path: string, v: unknown) => void
  }) => {
    const handleUpdate = (path: string) => (value: unknown) =>
      onUpdate(path, value)
    const [collapsed, toggleCollapsed] = useToggle(true)

    const title = this.args.collapsed
      ? (line[this.args.collapsed] as string)
      : `Element #${index + 1}`
    const escapedTitle = useMemo(() => textContent(title), [title])

    return (
      <Item item={line}>
        <SidebarHeading onClick={prevent(toggleCollapsed)} title={escapedTitle}>
          <SidebarHeading.Hover>
            {onRemove && (
              <ButtonIcon
                danger
                onClick={() => onRemove(line)}
                title="Supprimer l'élément"
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
            <this.fields
              fields={this.args.fields}
              line={line}
              index={index}
              onUpdate={handleUpdate}
            />
          </ItemBody>
        )}
      </Item>
    )
  }

  private fields = ({
    fields,
    line,
    onUpdate,
    index,
  }: {
    fields: Array<EditorField<any> | AbstractFieldGroup<any>>
    line: RepeaterLine
    index: number
    onUpdate: (path: string) => (v: unknown) => void
  }) => {
    return (
      <>
        {fields.map((field, k) => (
          <this.fieldComponent
            key={k}
            field={field}
            line={line}
            onUpdate={onUpdate}
            index={index}
          />
        ))}
      </>
    )
  }

  private fieldComponent = ({
    field,
    line,
    onUpdate,
    index,
  }: {
    field: EditorField<any> | AbstractFieldGroup<any>
    line: RepeaterLine
    index: number
    onUpdate: (path: string) => (v: unknown) => void
  }) => {
    if (!field.shouldRender(line)) {
      return null
    }
    if (field instanceof AbstractFieldGroup) {
      return (
        <field.render>
          <this.fields
            fields={field.fields}
            line={line}
            onUpdate={onUpdate}
            index={index}
          />
        </field.render>
      )
    }
    return (
      <field.field
        value={line[field.name]}
        onChange={onUpdate(`${index}.${field.name}`)}
      />
    )
  }
}

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
