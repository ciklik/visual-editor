import { EditorField, EditorFieldProps } from '../types'
import { useUniqId } from '../hooks/useUniqId'
import { AbstractField } from './AbstractField'

type FieldArgs = {
  label?: string
  required?: boolean
  multiline?: boolean
  help?: string
}

/**
 * Enregistre un champs de type texte
 */
export class Text
  extends AbstractField<FieldArgs, string>
  implements EditorField<string>
{
  field({ value, onChange }: EditorFieldProps<string>) {
    const id = useUniqId('textinput')
    return (
      <div class="form-group">
        {this.args.label && (
          <label for={id} class="form-label">
            {this.args.label}
          </label>
        )}
        {this.args.multiline ? (
          <textarea
            id={id}
            class="form-control"
            defaultValue={value}
            onInput={(e) => onChange((e.target as HTMLTextAreaElement).value)}
          />
        ) : (
          <input
            type="text"
            id={id}
            class="form-control"
            defaultValue={value}
            onInput={(e) => onChange((e.target as HTMLInputElement).value)}
          />
        )}
        {this.args.help && <div class="form-text">{this.args.help}</div>}
      </div>
    )
  }
}
