import { EditorField } from '../types'
import { uniqId } from '../functions/string'
import { useUniqId } from '../hooks/useUniqId'
import { deepSet } from '../functions/object'

type FieldArgs = {
  label?: string,
  min?: number,
  max?: number,
  addLabel?: string,
  fields: EditorField[],
}

/**
 * Permet de créer une liste de champs imbriqués
 */
export class Repeater implements EditorField {

  name: string
  private args: FieldArgs

  constructor (name: string, args: FieldArgs) {
    this.name = name
    this.args = {addLabel: 'Ajouter un élément', ...args}
  }

  public field = ({ value, onChange }: { value?: Array<Object>, onChange: (value: any) => void }) => {
    value = value ?? [];
    const canAdd = !this.args.max || value.length < this.args.max
    const add = () => {
      onChange([...value, {}])
    }
    const remove = (line) => {
      onChange(value.filter(v => v !== line))
    }
    const updateProperty = (path) => (v) => {
      console.log(deepSet(value, path, v));
      onChange(deepSet(value, path, v))
    }
    return <div class="ve-repeater">
      {value.map((line, k) => {
        return <div class="ve-repeater-item">
          {this.args.fields.map(field => {
            const FieldComponent = field.field
            return <FieldComponent value={line[field.name]} onChange={updateProperty(`${k}.${field.name}`)}/>
          })}
          <button class="ve-repeater-remove" onClick={() => remove(line)} title="Supprimer l'élément">&times;</button>
        </div>
      })}
      {canAdd && <button class="ve-repeater-add" onClick={add}>{this.args.addLabel}</button>}
    </div>;
  }
}

