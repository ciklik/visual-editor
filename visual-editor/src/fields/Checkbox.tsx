import { useUniqId } from 'src/hooks/useUniqId'
import styled from '@emotion/styled'
import { FieldComponent } from 'src/types'
import { defineField } from 'src/fields/utils'
import { Field } from 'src/components/ui'

type FieldArgs = {
  label: string
  help?: string
  default?: boolean
}

const Component: FieldComponent<FieldArgs, boolean> = ({
  value,
  onChange,
  options,
}) => {
  const id = useUniqId('checkbox')
  return (
    <Field help={options.help}>
      <Wrapper>
        <Input
          type="checkbox"
          id={id}
          checked={value}
          onChange={() => onChange(!value)}
        />
        <Label htmlFor={id}>{options.label}</Label>
      </Wrapper>
    </Field>
  )
}

export const Checkbox = defineField<FieldArgs, boolean>({
  defaultOptions: {
    label: '',
    default: false,
  },
  render: Component,
})

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
  lineHeight: 1,
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
