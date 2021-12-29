import { AbstractField } from 'src/fields/AbstractField'
import { useUniqId } from 'src/hooks/useUniqId'
import styled from '@emotion/styled'

type FieldArgs = {
  label: string
  default?: boolean
}

export class Checkbox extends AbstractField<FieldArgs, boolean> {
  get defaultArgs() {
    return { default: false }
  }

  field({
    value,
    onChange,
  }: {
    value?: boolean
    onChange: (value: boolean) => void
  }) {
    const id = useUniqId('checkbox')
    return (
      <Wrapper>
        <Input
          type="checkbox"
          id={id}
          checked={value}
          onChange={(e) => onChange(!value)}
        />
        <Label htmlFor={id}>{this.args.label}</Label>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div({
  position: 'relative',
  display: 'flex',
})

const Input = styled('input', { target: 've-checkbox-input' })({
  position: 'absolute',
  inset: 0,
  opacity: 0,
  cursor: 'pointer',
  zIndex: 5,
})

const Label = styled.label({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '&::before': {
    cursor: 'pointer',
    display: 'block',
    content: "''",
    width: '38px',
    height: '20px',
    border: 'solid 1px var(--ve-field-border)',
    borderRadius: '18px',
    marginRight: '.5em',
    transition: '.3s',
  },
  '&::after': {
    position: 'absolute',
    content: "''",
    top: '2px',
    left: '2px',
    borderRadius: '16px',
    width: '16px',
    height: '16px',
    backgroundColor: 'var(--ve-color-light)',
    transition: '.3s',
  },
  [`${Input}:checked + &::before`]: {
    borderColor: 'var(--ve-primary)',
    backgroundColor: 'var(--ve-primary)',
  },
  [`${Input}:focus + &::before`]: {
    outline: '0',
    boxShadow: '0 0 0 0.25rem rgb(23 113 230 / 25%)',
  },
  [`${Input}:checked + &::after`]: {
    backgroundColor: '#FFF',
    transform: 'translateX(17px)',
  },
})
