import { EditorFieldProps } from 'src/types'
import { AbstractField } from 'src/fields/AbstractField'
import { QuillEditor, QuillEditorMode } from 'src/fields/shared/QuillEditor'
import { Field } from 'src/components/ui'

type FieldArgs = {
  label?: string
  required?: boolean
  multiline?: boolean
  help?: string
  // Allow headings (h1, h2...)
  allowHeadings?: boolean
  // A set of color for text (ex: ["--primary", "--secondary"]
  colors?: string[]
  default?: string
}

/**
 * Enregistre un champs de type texte
 */
export class HTMLText extends AbstractField<FieldArgs, string> {
  variables: Record<string, string> = {}

  get defaultArgs() {
    return {
      multiline: true,
      allowHeadings: false,
      default: '',
    }
  }

  field({ value, onChange }: EditorFieldProps<string>) {
    return (
      <Field label={this.args.label} help={this.args.help}>
        <QuillEditor
          value={value || ''}
          onChange={onChange}
          mode={this.fieldType()}
          colors={this.args.colors}
        />
      </Field>
    )
  }

  background(fieldName: string) {
    this.variables.background = fieldName
    return this
  }

  color(fieldName: string) {
    this.variables.color = fieldName
    return this
  }

  private fieldType() {
    if (this.args.multiline === false) {
      return QuillEditorMode.SINGLE_LINE
    }
    if (this.args.allowHeadings) {
      return QuillEditorMode.FULL
    }
    return QuillEditorMode.DEFAULT
  }
}
