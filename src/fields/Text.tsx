import { EditorFieldProps } from 'src/types'
import { useUniqId } from 'src/hooks/useUniqId'
import { AbstractField } from 'src/fields/AbstractField'

type FieldArgs = {
  label?: string
  required?: boolean
  multiline?: boolean
  help?: string
  default?: string
}

/**
 * Enregistre un champs de type texte
 */
export class Text extends AbstractField<FieldArgs, string> {
  get defaultArgs() {
    return { default: '' }
  }

  field({ value, onChange }: EditorFieldProps<string>) {
    const id = useUniqId('textinput')
    return (
      <div>
        {this.args.label && (
          <label for={id} class="form-label">
            {this.args.label}
          </label>
        )}
        {this.args.multiline ? (
          <textarea
            id={id}
            class="ve-input"
            value={value}
            onInput={(e) => onChange((e.target as HTMLTextAreaElement).value)}
          />
        ) : (
          <input
            type="text"
            id={id}
            class="ve-input"
            value={value}
            onInput={(e) => onChange((e.target as HTMLInputElement).value)}
          />
        )}
        {this.args.help && <div class="ve-help">{this.args.help}</div>}
      </div>
    )
  }
}
