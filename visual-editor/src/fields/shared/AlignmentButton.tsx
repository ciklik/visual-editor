import type { FunctionComponent } from 'react'
import styled from '@emotion/styled'
import { capitalize } from 'src/functions/string'

type Props<T extends unknown> = {
  value: T
  checked: boolean
  icon: FunctionComponent
  onChange: (v: T) => void
  id?: string
}

export function AlignmentButton<T extends unknown>({
  value,
  onChange,
  icon: IconComponent,
  ...props
}: Props<T>) {
  return (
    <Button>
      <input
        type="radio"
        value={value as string}
        onChange={() => onChange(value)}
        title={capitalize(value as string)}
        {...props}
      />
      <div>
        <IconComponent />
      </div>
    </Button>
  )
}

const Button = styled.div({
  position: 'relative',
  borderRight: '1px solid var(--ve-field-border)',

  '&:last-of-type': {
    border: 'none',
  },

  '&:hover': {
    backgroundColor: 'var(--ve-hover)',
  },
  '& div': {
    cursor: 'pointer',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    transition: '.3s',
  },
  '& input': {
    opacity: 0,
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    zIndex: 3,
    cursor: 'pointer',
  },
  '& input:checked + div': {
    backgroundColor: 'var(--ve-primary)',
    color: '#FFF',
    boxShadow: '0 0 0 1px var(--ve-primary)',
    borderRadius: '.2em',
  },
  '& input:focus + div': {
    boxShadow:
      '0 0 0 1px var(--ve-primary), 0 0 0 0.25rem rgb(23 113 230 / 25%)',
    borderRadius: '.2em',
  },
})
