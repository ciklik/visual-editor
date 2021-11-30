import { EditorFieldProps } from 'src/types'
import { useUniqId } from 'src/hooks/useUniqId'
import { AbstractField } from 'src/fields/AbstractField'
import { Tooltip } from 'src/components/Tooltip'
import clsx from 'clsx'
import { prevent } from 'src/functions/functions'
import React, { CSSProperties } from 'react'
type FieldArgs = {
  label?: string
  colors: string[]
}

/**
 * Enregistre un champs de type texte
 */
export class Color extends AbstractField<FieldArgs, string | null> {
  field({ value, onChange }: EditorFieldProps<string | null>) {
    const id = useUniqId('color')

    return (
      <div className="form-group">
        {this.args.label && (
          <label htmlFor={id} className="form-label">
            {this.args.label}
          </label>
        )}
        <Tooltip trigger="click" content={<this.tooltip onChange={onChange} />}>
          <button
            className={clsx(
              've-color-button',
              !value && 've-color-button-transparent'
            )}
            onClick={(e) => e.preventDefault()}
            style={value ? {"--ve-selected-color": `var(${value})`} as CSSProperties : undefined}
          />
        </Tooltip>
      </div>
    )
  }

  tooltip = ({ onChange }: EditorFieldProps<string | null>) => {
    return (
      <div className="ve-color-palette">
        <button
          className="ve-color-transparent"
          onClick={prevent(() => onChange(null))}
        />
        {this.args.colors.map((color) => (
          <button
            style={{"--ve-color": `var(${color})`} as CSSProperties}
            onClick={prevent(() => onChange(color))}
          />
        ))}
      </div>
    )
  }
}
