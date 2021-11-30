import { EditorFieldProps } from 'src/types'
import { useUniqId } from 'src/hooks/useUniqId'
import { AbstractField } from 'src/fields/AbstractField'
import React from 'react'

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
      <div>
        {this.args.label && (
          <label htmlFor={id} className="form-label">
            {this.args.label}
          </label>
        )}
        <select
          className="form-control"
          value={value}
          onChange={(e) => onChange((e.target as HTMLSelectElement).value)}
        >
          {this.args.options.map((option: Option, key) => {
            return (
              <option value={option.value} key={key}>
                {option.label}
              </option>
            )
          })}
        </select>
        {this.args.help && <div className="ve-help">{this.args.help}</div>}
      </div>
    )
  }
}
