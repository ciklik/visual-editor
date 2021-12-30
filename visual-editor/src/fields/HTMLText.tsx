import { FieldComponent } from 'src/types'
import { QuillEditor, QuillEditorMode } from 'src/components/Editor/QuillEditor/QuillEditor'
import { Field } from 'src/components/ui'
import { defaultFieldProperties } from 'src/fields/utils'

type FieldArgs = {
  label?: string
  multiline?: boolean
  help?: string
  // Allow headings (h1, h2...)
  allowHeadings?: boolean
  // A set of color for text (ex: ["--primary", "--secondary"]
  colors?: string[]
  default?: string,
  backgroundColor?: string,
  textColor?: string
}

type ExtraParams = {backgroundColor?: string, textColor?: string}

const fieldType = (options: FieldArgs): QuillEditorMode => {
    if (options.multiline === false) {
      return QuillEditorMode.SINGLE_LINE
    }
    if (options.allowHeadings) {
      return QuillEditorMode.FULL
    }
    return QuillEditorMode.DEFAULT
}

const Component: FieldComponent<FieldArgs, string, ExtraParams> = ({value, onChange, options, backgroundColor, textColor}) => {
return <Field label={options.label} help={options.help}>
  <QuillEditor
    value={value || ''}
    onChange={onChange}
    mode={fieldType(options)}
    colors={options.colors}
    backgroundColor={backgroundColor}
    color={textColor}
  />
</Field>
}

export const HTMLText = (name: string, options: FieldArgs) => {
  return {
    name: name,
    options: {
      multiline: true,
      allowHeadings: false,
      default: '',
       ...options
    },
    extraProps: (data: Record<string, unknown>) => ({
      backgroundColor: options.backgroundColor ? data[options.backgroundColor] : undefined,
      textColor: options.textColor ? data[options.textColor] : undefined
    }),
    render: Component,
    ...defaultFieldProperties()
  }
}
