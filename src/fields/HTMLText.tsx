import { EditorField, EditorFieldProps } from 'src/types'
import { AbstractField } from 'src/fields/AbstractField'
import { QuillEditor, QuillEditorMode } from 'src/fields/shared/QuillEditor'
import React from 'react'
type FieldArgs = {
  label?: string
  required?: boolean
  multiline?: boolean
  help?: string
  allowHeadings?: boolean
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
      <div className="form-group">
        {this.args.label && <label className="form-label">{this.args.label}</label>}
        <div className="ve-input ve-wysiwyg">
          <QuillEditor
            value={value || ''}
            onChange={onChange}
            mode={this.fieldType()}
            colors={this.args.colors}
          />
        </div>
        {this.args.help && <div className="ve-help">{this.args.help}</div>}
      </div>
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
