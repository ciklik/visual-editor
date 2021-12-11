import cx from 'clsx'
import React from 'react'

import Styles from './Button.module.scss'

type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'icon'> & {
  secondary?: boolean
  icon?: (...args: any) => JSX.Element
  className?: string
}

export function Button({
  children,
  icon: IconElement,
  secondary,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        Styles.Button,
        secondary && Styles.ButtonSecondary,
        className
      )}
      {...props}
    >
      {IconElement && <IconElement size={20} />}
      {children}
    </button>
  )
}
