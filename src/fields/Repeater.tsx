import { EditorField, EditorFieldProps } from 'src/types'
import { deepSet, indexify } from 'src/functions/object'
import { moveItem } from 'src/functions/array'
import { uniqId } from 'src/functions/string'
import { AbstractField } from 'src/fields/AbstractField'
import { Sortable, SortableWrapper } from 'src/components/Sortable'
import { useToggle } from 'src/hooks/useToggle'
import { prevent } from 'src/functions/functions'
import { fillDefaults } from '../functions/fields'

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
                onRemove={canRemove ? remove : null}
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
    onRemove: null | ((line: RepeaterLine) => void)
    onUpdate: (path: string, v: unknown) => void
  }) => {
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
        {onRemove && (
          <button
            class="ve-repeater-remove"
            onClick={() => onRemove(line)}
            title="Supprimer l'élément"
          >
            &times;
          </button>
        )}
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
