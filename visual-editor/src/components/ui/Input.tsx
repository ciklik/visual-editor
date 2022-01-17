import styled from '@emotion/styled'

export const Input = styled.input({
  color: 'var(--ve-color)',
  background: 'transparent',
  padding: '.5rem .75em',
  lineHeight: '1.25rem',
  borderRadius: '.2rem',
  display: 'block',
  width: '100%',
  border: '1px solid var(--ve-field-border)',
  boxShadow: 'var(--ve-field-shadow)',
  '&:focus': {
    borderColor: 'var(--ve-primary)',
    outline: '0',
    boxShadow: '0 0 0 0.25rem rgb(23 113 230 / 25%)',
  },
})
