import { EditorFieldProps } from 'src/types'
import { useUniqId } from 'src/hooks/useUniqId'
import { AbstractField } from 'src/fields/AbstractField'
import React from 'react'
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
      <div>
        {this.args.label && (
          <label htmlFor={id} className="form-label">
            {this.args.label}
          </label>
        )}
        <input
          type="number"
          id={id}
          className="ve-input"
          value={value}
          onInput={(e) => onChange((e.target as HTMLInputElement).value)}
        />
        {this.args.help && <div className="ve-help">{this.args.help}</div>}
      </div>
    )
  }
}
