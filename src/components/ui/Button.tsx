import type { ComponentChildren, Component, PreactElement } from 'preact/src/internal'
import cx from 'clsx'

import Styles from './Button.module.scss'

type ButtonProps =  Omit<JSX.HTMLAttributes<HTMLButtonElement>, 'icon'> & {
  secondary?: boolean,
  children: ComponentChildren,
  icon?: (...args: any) => JSX.Element
}

export function Button ({children, icon: IconElement, secondary, ...props}: ButtonProps) {
  return <button class={cx(Styles.Button, secondary && Styles.ButtonSecondary)} {...props}>
    {IconElement && <IconElement size={20}/>}
    {children}
  </button>
}
