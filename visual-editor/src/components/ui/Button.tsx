import styled from '@emotion/styled'

type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'icon'> & {
  secondary?: boolean
  icon?: (...args: any) => JSX.Element
  size?: 'small' | 'default'
}

export function Button({
  children,
  icon: IconElement,
  size = 'default',
  secondary = false,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      css={[secondary && Secondary, size === 'small' && Small]}
      {...props}
    >
      {IconElement && <IconElement size={20} />}
      {children}
    </BaseButton>
  )
}

const BaseButton = styled.button({
  outline: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5em',
  fontWeight: 700,
  backgroundColor: 'var(--ve-primary)',
  border: 'none',
  color: '#fff',
  alignSelf: 'flex-end',
  fontSize: '0.9rem',
  height: 48,
  padding: '0 1em',
  lineHeight: '1.25rem',
  cursor: 'pointer',
  borderRadius: 4,
  transition: 'background-color 0.3s',
  '&:hover, &:focus': { backgroundColor: 'var(--ve-primary-hover)' },
})

const Secondary = {
  backgroundColor: 'transparent',
  color: 'var(--ve-primary)',
  '&:hover, &:focus': { backgroundColor: 'var(--ve-primary-light)' },
}

const Small = {
  height: 40,
}
