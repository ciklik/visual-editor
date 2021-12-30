import { FieldComponent } from 'src/types'
import { QuillEditor, QuillEditorMode } from 'src/fields/shared/QuillEditor'
import { Field } from 'src/components/ui'
import { defineField } from 'src/fields/utils'

type FieldArgs = {
  label?: string
  multiline?: boolean
  help?: string
  // Allow headings (h1, h2...)
  allowHeadings?: boolean
  // A set of color for text (ex: ["--primary", "--secondary"]
  colors?: string[]
  default?: string,
  variables?: Record<string, string>
}

const fieldType = (options: FieldArgs): QuillEditorMode => {
    if (options.multiline === false) {
      return QuillEditorMode.SINGLE_LINE
    }
    if (options.allowHeadings) {
      return QuillEditorMode.FULL
    }
    return QuillEditorMode.DEFAULT
}

const Component: FieldComponent<FieldArgs, string> = ({value, onChange, options}) => {
return <Field label={options.label} help={options.help}>
  <QuillEditor
    value={value || ''}
    onChange={onChange}
    mode={fieldType(options)}
    colors={options.colors}
  />
</Field>
}

export const HTMLText = defineField<FieldArgs, string>({
  defaultOptions: {
    multiline: true,
    allowHeadings: false,
    default: '',
    variables: {},
  },
  render: Component
})
