import Styles from './Flex.module.scss'
import cx from 'clsx'
import type { ComponentChildren } from 'preact'
import { FunctionComponent } from 'preact'

type FlexProps = JSX.HTMLAttributes<HTMLElement> & {
  between?: boolean,
  children: ComponentChildren,
  as?: FunctionComponent<any> | string
}

export function Flex ({as: ElementComponent = 'div', between, children, className, ...props}: FlexProps) {
  return <ElementComponent {...props} class={cx(Styles.Flex, between && Styles.FlexBetween, className)}>
    {children}
  </ElementComponent>
}
