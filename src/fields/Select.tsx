import { EditorFieldProps } from 'src/types'
import { useUniqId } from 'src/hooks/useUniqId'
import { AbstractField } from 'src/fields/AbstractField'
import { Field } from '../components/ui/Field'

type Option = {
  value: string
  label: string
}

type FieldArgs = {
  label?: string
  required?: boolean
  options: Option[]
  help?: string
  default?: string
}

/**
 * Enregistre un champs de type texte
 */
export class Select extends AbstractField<FieldArgs, string> {
  get defaultArgs() {
    return { default: '' }
  }

  field({ value, onChange }: EditorFieldProps<string>) {
    const id = useUniqId('textinput')
    return (
      <Field
        id={id}
        label={this.args.label}
        help={this.args.help}
        options={this.args.options}
        value={value}
        onChange={(e) => onChange((e.target as HTMLSelectElement).value)}
      />
    )
  }
}
