import Styles from './Button.module.scss'
import cx from 'clsx'
import { ReactElement } from 'react'
import React from 'react'
import { Tooltip } from './Tooltip'

type ButtonProps = JSX.IntrinsicElements['button'] & {
  children: ReactElement
  danger?: boolean
  success?: boolean
  className?: string
  rotate?: number
  title?: string
}

export function ButtonIcon({
  children,
  className,
  danger,
  success,
  rotate,
  title,
  ...props
}: ButtonProps) {
  const style = rotate ? { transform: `rotate(${rotate}deg)` } : undefined
  const button = (
    <button
      {...props}
      className={cx(
        Styles.ButtonIcon,
        danger && Styles.ButtonIconDanger,
        success && Styles.ButtonIconSuccess,
        className
      )}
      style={style}
    >
      {children}
    </button>
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
