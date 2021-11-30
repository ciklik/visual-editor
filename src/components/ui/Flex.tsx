import Styles from './Flex.module.scss'
import cx from 'clsx'
import { FunctionComponent, ReactElement, ReactNode } from 'react'
import React from 'react'

type FlexProps = {
  between?: boolean,
  children: ReactNode,
  as?: FunctionComponent<any> | string,
  className?: string
}

export function Flex ({as: ElementComponent = 'div', between, children, className, ...props}: FlexProps) {
  return <ElementComponent {...props} className={cx(Styles.Flex, between && Styles.FlexBetween, className)}>
    {children}
  </ElementComponent>
}
