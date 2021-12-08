import { EditorFieldProps } from 'src/types'
import { useUniqId } from 'src/hooks/useUniqId'
import { AbstractField } from 'src/fields/AbstractField'
import { Field } from '../components/ui/Field'

type FieldArgs = {
  label?: string
  required?: boolean
  help?: string
  default?: string | number
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
      <Field
        id={id}
        type="number"
        label={this.args.label}
        help={this.args.help}
        value={value}
        onInput={(e) => onChange((e.target as HTMLInputElement).value)}
      />
    )
  }
}
