import { EditorField, EditorFieldProps } from 'src/types'
import { deepSet } from 'src/functions/object'
import { moveItem } from 'src/functions/array'
import { uniqId } from 'src/functions/string'
import { AbstractField } from 'src/fields/AbstractField'
import { Sortable, SortableWrapper } from 'src/components/Sortable'
import { useToggle } from 'src/hooks/useToggle'
import { prevent } from 'src/functions/functions'

type FieldArgs = {
  label?: string
  min?: number
  max?: number
  addLabel?: string
  fields: EditorField<any>[]
  title?: string
  collapsed?: string
}

type RepeaterLine = { _id: string; [key: string]: unknown }

/**
 * Permet de créer une liste de champs imbriqués
 */
export class Repeater extends AbstractField<FieldArgs, RepeaterLine[]> {
  defaultArgs = { addLabel: 'Ajouter un élément' }

  public field = ({
    value: valueProps,
    onChange,
  }: EditorFieldProps<RepeaterLine[]>) => {
    const value: RepeaterLine[] = valueProps ?? []
    const canAdd = !this.args.max || value.length < this.args.max

    const add = () => {
      onChange([...value, { _id: uniqId() }])
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
      <div>
        {this.args.title && <label>{this.args.title}</label>}
        <SortableWrapper items={value} onMove={handleMove}>
          <div class="ve-repeater">
            {value.map((line, k) => (
              <this.fieldLine
                key={line._id}
                line={line}
                index={k}
                onUpdate={updateProperty}
                onRemove={remove}
              />
            ))}
            {canAdd && (
              <div class="ve-repeater-footer">
                <button className="ve-repeater-add" onClick={prevent(add)}>
                  {this.args.addLabel}
                </button>
              </div>
            )}
          </div>
        </SortableWrapper>
      </div>
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
    onRemove: (line: RepeaterLine) => void
    onUpdate: (path: string, v: unknown) => void
  }) => {
    const handleRemove = () => onRemove(line)
    const handleUpdate = (path: string) => (value: unknown) =>
      onUpdate(path, value)
    const [collapsed, toggleCollapsed] = useToggle(
      !!(this.args.collapsed && line[this.args.collapsed])
    )
    const visibleFields = this.args.fields.filter((field) =>
      collapsed ? field.name === this.args.collapsed : true
    )

    return (
      <Sortable item={line} class="ve-repeater-item">
        {visibleFields.map((field) => (
          <field.field
            value={line[field.name]}
            onChange={handleUpdate(`${index}.${field.name}`)}
          />
        ))}
        <button
          class="ve-repeater-remove"
          onClick={handleRemove}
          title="Supprimer l'élément"
        >
          &times;
        </button>
        {this.args.collapsed && (
          <button
            class="ve-repeater-collapse"
            onClick={toggleCollapsed}
            title="Replier/Déplier l'élément"
          >
            {collapsed ? '▴' : '▾'}
          </button>
        )}
      </Sortable>
    )
  }
}
