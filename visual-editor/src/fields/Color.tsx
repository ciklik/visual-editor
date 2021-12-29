import { EditorFieldProps } from 'src/types'
import { AbstractField } from 'src/fields/AbstractField'
import { prevent } from 'src/functions/functions'
import React, { CSSProperties, useState } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Field, Styles, UnstyledButton } from 'src/components/ui'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

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
          <Button
            focused={isOpen}
            color={value || ''}
            style={
              value
                ? ({
                    '--ve-selected-color': `var(${value})`,
                  } as CSSProperties)
                : undefined
            }
          />
          <Tooltip side="top">
            <this.palette onChange={handleChange} />
            <Arrow />
          </Tooltip>
        </Popover.Root>
      </Field>
    )
  }

  palette = ({ onChange }: EditorFieldProps<string | null>) => {
    return (
      <Palette
        style={{ '--children': this.args.colors.length + 1 } as CSSProperties}
      >
        <PaletteItemTransparent onClick={prevent(() => onChange(null))} />
        {this.args.colors.map((color) => (
          <PaletteItem
            key={color}
            style={{ '--ve-color': `var(${color})` } as CSSProperties}
            onClick={prevent(() => onChange(color))}
          />
        ))}
      </Palette>
    )
  }
}

const Button = styled(Popover.Trigger)<{
  focused: boolean
  color: string
}>(
  {
    width: '38px',
    height: '38px',
    backgroundColor: '#fff',
    boxShadow: 'var(--ve-field-shadow)',
    border: '1px solid var(--ve-field-border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: '3px',
    '&::before': {
      content: "''",
      display: 'block',
      width: '28px',
      height: '28px',
      background: 'var(--ve-selected-color, red)',
      borderRadius: '2px',
    },
    '&:focus': Styles.FocusState,
  },
  (props) => ({
    ...(props.focused ? Styles.FocusState : null),
    '&::before': props.color ? null : Styles.Mosaic,
  })
)

const In = keyframes({
  from: {
    transform: 'translateY(-.2em)',
    opacity: 0,
  },
})

const Tooltip = styled(Popover.Content)({
  padding: '.5em',
  backgroundColor: 'white',
  boxShadow:
    'rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px',
  borderRadius: '4px',
  animation: `${In} 0.3s ease-out`,
})

const Palette = styled.div({
  flexWrap: 'wrap',
  display: 'flex',
  width: 'calc(25px * var(--children) * 0.5)',
})

const PaletteItem = styled(UnstyledButton)({
  position: 'relative',
  backgroundColor: 'var(--ve-color)',
  width: '25px',
  height: '25px',
  flex: 'none',
  zIndex: 2,
  cursor: 'pointer',
  borderRadius: '2px',
  border: '1px solid var(--ve-field-border)',
  boxShadow: 'var(--ve-field-shadow)',
  '&:hover': {
    borderColor: 'var(--ve-primary)',
    outline: '0',
    boxShadow: '0 0 0 0.25rem rgb(23 113 230 / 25%)',
  },
})

const PaletteItemTransparent = styled(PaletteItem)({
  ...Styles.Mosaic,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    position: 'absolute',
    top: '-9px',
    left: 'calc(50% - 1px)',
    content: "''",
    width: '2px',
    height: '40px',
    background: 'red',
    transform: 'rotate(45deg)',
  },
})

const Arrow = styled(Popover.Arrow)({
  fill: 'white',
})
