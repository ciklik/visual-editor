import Styles from './Button.module.scss'
import cx from 'clsx'
import { ReactElement } from 'react'
import React from 'react'

type ButtonProps =  JSX.IntrinsicElements['button'] & {
  children: ReactElement,
  danger?: boolean,
  className?: string,
  rotate?: number
}

export function ButtonIcon ({children, className, danger, rotate, ...props}: ButtonProps) {
  const style = rotate ? {transform: `rotate(${rotate}deg)`} : undefined
  return <button {...props} className={cx(Styles.ButtonIcon, danger && Styles.ButtonIconDanger, className)} style={style}>
    {children}
  </button>
}
