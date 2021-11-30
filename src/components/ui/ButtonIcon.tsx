import Styles from './Button.module.scss'
import type { ComponentChildren } from 'preact'
import cx from 'clsx'

type ButtonProps =  JSX.HTMLAttributes<HTMLButtonElement> & {
  children: ComponentChildren,
  danger?: boolean
}

export function ButtonIcon ({children, className, danger, ...props}: ButtonProps) {
  return <button {...props} class={cx(Styles.ButtonIcon, danger && Styles.ButtonIconDanger, className)}>
    {children}
  </button>
}
