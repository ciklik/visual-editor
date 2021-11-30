import { EditorFieldProps } from 'src/types'
import { useUniqId } from 'src/hooks/useUniqId'
import { AbstractField } from 'src/fields/AbstractField'
import React from 'react'
type FieldArgs = {
  label?: string
  required?: boolean
  help?: string
  default?: number
  min?: number
  max?: number
  step?: number
}

/**
 * Enregistre un champs de type texte
 */
export class Range extends AbstractField<FieldArgs, number> {
  get defaultArgs() {
    return { default: 5, min: 0, max: 5, step: 1 }
  }

  field({ value, onChange }: EditorFieldProps<number>) {
    const id = useUniqId('rangeinput')
    const marks = Math.round(
      (this.args.max! - this.args.min! + 1) / this.args.step!
    )
    const ticks = new Array(marks).fill(0).map((v, k) => k + this.args.min!)
    return (
      <div>
        {this.args.label && (
          <label htmlFor={id} className="form-label">
            {this.args.label} <small>({value})</small>
          </label>
        )}
        <input
          type="range"
          min={this.args.min}
          max={this.args.max}
          step={this.args.step}
          id={id}
          list={id + 'marks'}
          className="ve-input"
          value={value}
          onInput={(e) =>
            onChange(parseInt((e.target as HTMLInputElement).value, 10))
          }
        />
        <datalist id={id + 'marks'}>
          {ticks.map((t) => (
            <option key={t} value={t.toString()} />
          ))}
        </datalist>
        {this.args.help && <div className="ve-help">{this.args.help}</div>}
      </div>
    )
  }
}
