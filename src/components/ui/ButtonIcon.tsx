import Styles from './Button.module.scss'
import cx from 'clsx'
import { ReactElement } from 'react'
import React from 'react'

type ButtonProps =  JSX.IntrinsicElements['button'] & {
  children: ReactElement,
  danger?: boolean,
  className?: string
}

export function ButtonIcon ({children, className, danger, ...props}: ButtonProps) {
  return <button {...props} className={cx(Styles.ButtonIcon, danger && Styles.ButtonIconDanger, className)}>
    {children}
  </button>
}
