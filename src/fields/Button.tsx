import { EditorFieldProps } from 'src/types'
import { useUniqId } from 'src/hooks/useUniqId'
import { AbstractField } from 'src/fields/AbstractField'

type FieldArgs = {
  label?: string
  required?: boolean
  help?: string
}

type InputValue = {
  title: string
  href: string
  type: string
}

const TYPES: Record<string, string> = {
  primary: 'Primaire',
  secondary: 'Secondaire',
  danger: 'Danger',
}

/**
 * Enregistre un champs de type texte
 */
export class Button extends AbstractField<FieldArgs, InputValue> {
  public field({ value, onChange }: EditorFieldProps<InputValue>) {
    const id = useUniqId('textinput')
    value = value ?? { title: '', href: '', type: 'primary' }

    const onPropertyChange = (name: keyof InputValue) => (e: Event) => {
      onChange({
        ...value,
        [name]: (e.target as HTMLInputElement).value,
      } as InputValue)
    }

    return (
      <div class="form-group">
        {this.args.label && (
          <label for={id} class="form-label">
            {this.args.label}
          </label>
        )}
        <div className="ve-flex">
          <input
            placeholder="Titre"
            type="text"
            id={`id`}
            class="form-control"
            value={value.title}
            onInput={onPropertyChange('title')}
          />
          <input
            placeholder="URL"
            type="text"
            class="form-control"
            value={value.href}
            onInput={onPropertyChange('href')}
          />
          <select
            class="form-control"
            value={value.type}
            onInput={onPropertyChange('type')}
          >
            {Object.keys(TYPES).map((type) => {
              return (
                <option value={type} key={type}>
                  {TYPES[type]}
                </option>
              )
            })}
          </select>
        </div>
        {this.args.help && <div class="form-text">{this.args.help}</div>}
      </div>
    )
  }
}
