import { Tooltip } from './Tooltip'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

type ButtonProps = JSX.IntrinsicElements['button'] & {
  danger?: boolean
  success?: boolean
  rotate?: number
  title?: string
}

export function ButtonIcon({
  danger,
  success,
  rotate,
  title,
  ...props
}: ButtonProps) {
  const style = rotate ? { transform: `rotate(${rotate}deg)` } : undefined
  const button = (
    <BaseButton
      {...props}
      aria-label={title}
      css={[danger && Danger, success && Success]}
      style={style}
    />
  )
  if (title) {
    return (
      <Tooltip content={title} trigger="focus">
        {button}
      </Tooltip>
    )
  }

  return button
}

const BaseButton = styled.button({
  flex: 'none',
  width: 40,
  height: 40,
  borderRadius: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  transition: 'background-color 0.3s, transform 0.3s',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  color: 'var(--ve-color-light)',
  background: 'var(--ve-background)',
  '&:hover, &:focus': {
    backgroundColor: 'var(--ve-hover)',
    color: 'var(--ve-color)',
  },
})

const Danger = {
  color: 'var(--ve-danger)',
  '&:hover, &:focus': {
    color: 'var(--ve-danger)',
    backgroundColor: 'var(--ve-danger-light)',
  },
}

const Success = {
  color: '#059669',
  '&:hover, &:focus': {
    color: '#059669',
    backgroundColor: 'rgba(110, 231, 183, .2)',
  },
}

const Flipped = css({
  transform: 'rotate(180deg)',
})
