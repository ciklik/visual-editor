import { EditorField, EditorFieldProps } from 'src/types'
import { useUniqId } from 'src/hooks/useUniqId'
import { AbstractField } from './AbstractField'
import { useToggle } from 'src/hooks/useToggle'
import { useRef } from 'preact/hooks'
import { Tooltip } from 'src/components/Tooltip'
import { useClickAway } from 'react-use'
import clsx from 'clsx'

type FieldArgs = {
  label?: string
  colors: string[]
}

/**
 * Enregistre un champs de type texte
 */
export class Color
  extends AbstractField<FieldArgs, string | null>
  implements EditorField<string | null>
{
  field({ value, onChange }: EditorFieldProps<string | null>) {
    const buttonRef = useRef<HTMLButtonElement>(null)
    const id = useUniqId('color')
    const [isVisible, togglePalette, setPaletteVisible] = useToggle(false)
    useClickAway(buttonRef, () => {
      setPaletteVisible(false)
    })

    return (
      <div class="form-group">
        {this.args.label && (
          <label for={id} class="form-label">
            {this.args.label}
          </label>
        )}
        <button
          ref={buttonRef}
          onClick={togglePalette}
          class={clsx(
            've-color-button',
            !value && 've-color-button-transparent'
          )}
          style={value ? `--veSelectedColor: var(${value})` : ``}
        />
        <Tooltip targetRef={buttonRef} visible={isVisible}>
          <div class="ve-color-palette">
            <button
              class="ve-color-transparent"
              onClick={() => onChange(null)}
            />
            {this.args.colors.map((color) => (
              <button
                style={`--veColor: var(${color})`}
                onClick={() => onChange(color)}
              />
            ))}
          </div>
        </Tooltip>
      </div>
    )
  }
}
