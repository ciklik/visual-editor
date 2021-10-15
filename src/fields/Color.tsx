import { EditorFieldProps } from 'src/types'
import { useUniqId } from 'src/hooks/useUniqId'
import { AbstractField } from 'src/fields/AbstractField'
import { Tooltip } from 'src/components/Tooltip'
import clsx from 'clsx'
import { prevent } from 'src/functions/functions'

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
      <div class="form-group">
        {this.args.label && (
          <label for={id} class="form-label">
            {this.args.label}
          </label>
        )}
        <Tooltip trigger="click" content={<this.tooltip onChange={onChange} />}>
          <button
            class={clsx(
              've-color-button',
              !value && 've-color-button-transparent'
            )}
            onClick={(e) => e.preventDefault()}
            style={value ? `--ve-selected-color: var(${value})` : ``}
          />
        </Tooltip>
      </div>
    )
  }

  tooltip = ({ onChange }: EditorFieldProps<string | null>) => {
    return (
      <div class="ve-color-palette">
        <button
          class="ve-color-transparent"
          onClick={prevent(() => onChange(null))}
        />
        {this.args.colors.map((color) => (
          <button
            style={`--ve-color: var(${color})`}
            onClick={prevent(() => onChange(color))}
          />
        ))}
      </div>
    )
  }
}
