import { EditorFieldProps } from 'src/types'
import { useUniqId } from 'src/hooks/useUniqId'
import { AbstractField } from 'src/fields/AbstractField'
import { Field } from '../components/ui/Field'

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
      <Field
        label={this.args.label}
        type={this.args.multiline ? 'textarea' : 'text'}
        id={id}
        value={value}
        onInput={(e) => onChange((e.target as HTMLTextAreaElement).value)}
        help={this.args.help}
      />
    )
  }
}
