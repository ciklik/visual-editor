import { EditorFieldProps } from 'src/types'
import { AbstractField } from 'src/fields/AbstractField'
import clsx from 'clsx'
import { prevent } from 'src/functions/functions'
import React, { CSSProperties, useState } from 'react'
import Styles from './Color.module.scss'
import * as Popover from '@radix-ui/react-popover'
import { Field } from 'src/components/ui'

type FieldArgs = {
  label?: string
  colors: string[]
}

/**
 * Enregistre un champs de type texte
 */
export class Color extends AbstractField<FieldArgs, string | null> {
  field({ value, onChange }: EditorFieldProps<string | null>) {
    const [isOpen, setOpen] = useState(false)

    const handleChange = (e: string | null) => {
      onChange(e)
      setOpen(false)
    }

    return (
      <Field label={this.args.label}>
        <Popover.Root open={isOpen} onOpenChange={() => setOpen((v) => !v)}>
          <Popover.Trigger
            className={clsx(
              Styles.ColorPickerButton,
              isOpen && Styles.ColorPickerButtonSelected,
              !value && Styles.ColorPickerButtonTransparent
            )}
            style={
              value
                ? ({
                    '--ve-selected-color': `var(${value})`,
                  } as CSSProperties)
                : undefined
            }
          />
          <Popover.Content className={Styles.ColorPickerContent} side="top">
            <this.palette onChange={handleChange} />
            <Popover.Arrow />
          </Popover.Content>
        </Popover.Root>
      </Field>
    )
  }

  palette = ({ onChange }: EditorFieldProps<string | null>) => {
    return (
      <div className={Styles.ColorPickerPalette}>
        <button
          className={Styles.ColorTransparent}
          onClick={prevent(() => onChange(null))}
        />
        {this.args.colors.map((color) => (
          <button
            key={color}
            style={{ '--ve-color': `var(${color})` } as CSSProperties}
            onClick={prevent(() => onChange(color))}
          />
        ))}
      </div>
    )
  }
}
