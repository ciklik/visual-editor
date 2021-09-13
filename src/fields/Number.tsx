import { EditorFieldProps } from 'src/types'
import { useUniqId } from 'src/hooks/useUniqId'
import { AbstractField } from 'src/fields/AbstractField'

type FieldArgs = {
  label?: string
  required?: boolean
  help?: string
  default?: string
}

/**
 * Enregistre un champs de type texte
 */
export class Number extends AbstractField<FieldArgs, string> {
  get defaultArgs() {
    return { default: '' }
  }

  field({ value, onChange }: EditorFieldProps<string>) {
    const id = useUniqId('numberinput')
    return (
      <div>
        {this.args.label && (
          <label for={id} class="form-label">
            {this.args.label}
          </label>
        )}
        <input
          type="number"
          id={id}
          class="ve-input"
          value={value}
          onInput={(e) => onChange((e.target as HTMLInputElement).value)}
        />
        {this.args.help && <div class="form-text">{this.args.help}</div>}
      </div>
    )
  }
}
