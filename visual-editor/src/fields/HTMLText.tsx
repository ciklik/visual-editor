import { FieldComponent } from 'src/types'
import { Field } from 'src/components/ui'
import { defaultFieldProperties } from 'src/fields/utils'
import { TiptapEditor } from 'src/components/Editor/TiptapEditor/TiptapEditor'
import { colorToProperty } from 'src/functions/css'

type FieldArgs = {
  label?: string
  multiline?: boolean
  help?: string
  // Allow headings (h1, h2...)
  allowHeadings?: boolean
  // A set of color for text (ex: ["--primary", "--secondary"]
  colors?: string[]
  default?: string
  backgroundColor?: string
  textColor?: string
  defaultAlign?: string
}

type ExtraParams = {
  backgroundColor?: string
  textColor?: string
  defaultAlign?: 'left' | 'right' | 'center' | 'justify'
}

const Component: FieldComponent<FieldArgs, string, ExtraParams> = ({
  value,
  onChange,
  options,
  backgroundColor,
  textColor,
  defaultAlign,
}) => {
  return (
    <Field label={options.label} help={options.help}>
      <TiptapEditor
        value={value}
        onChange={onChange}
        backgroundColor={backgroundColor}
        color={textColor}
        colors={options.colors}
        multiline={options.multiline}
        defaultAlign={defaultAlign}
      />
    </Field>
  )
}

export const HTMLText = (name: string, options: FieldArgs = {}) => {
  return {
    name: name,
    options: {
      multiline: true,
      allowHeadings: false,
      default: '',
      ...options,
    },
    extraProps: (data: Record<string, unknown>) => ({
      backgroundColor: colorToProperty(
        options.backgroundColor && (data[options.backgroundColor] as string)
      ),
      textColor: colorToProperty(
        options.textColor && (data[options.textColor] as string)
      ),
      defaultAlign: colorToProperty(
        options.defaultAlign && (data[options.defaultAlign] as string)
      ),
    }),
    render: Component,
    ...defaultFieldProperties(),
  }
}
