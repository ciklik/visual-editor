import { FieldComponent } from 'src/types'
import { useUniqId } from 'src/hooks/useUniqId'
import { Field } from 'src/components/ui'
import { defineField } from 'src/fields/utils'

type FieldArgs = {
  label?: string
  multiline?: boolean
  help?: string
  default?: string
}

const Component: FieldComponent<FieldArgs, string> = ({
  value,
  onChange,
  options,
}) => {
  const id = useUniqId('numberinput')
  return (
    <Field
      label={options.label}
      type="number"
      id={id}
      value={value}
      onInput={(e) => onChange((e.target as HTMLTextAreaElement).value)}
      help={options.help}
    />
  )
}

export const Number = defineField<FieldArgs, string>({
  defaultOptions: {
    default: '',
  },
  render: Component,
})
