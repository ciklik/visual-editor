import Styles from './Flex.module.scss'
import cx from 'clsx'
import { FunctionComponent, ReactNode } from 'react'

type FlexProps = {
  between?: boolean
  children: ReactNode
  as?: FunctionComponent<any> | string
  column?: boolean
  gap?: number
} & JSX.IntrinsicElements['div']

export function Flex({
  as: ElementComponent = 'div',
  between,
  gap,
  children,
  className,
  column,
  style: styleProps,
  ...props
}: FlexProps) {
  const style =
    gap !== undefined ? { '--ve-gap': `${gap}rem`, ...styleProps } : styleProps
  return (
    <ElementComponent
      {...props}
      className={cx(
        Styles.Flex,
        between && Styles.FlexBetween,
        column && Styles.FlexColumn,
        className
      )}
      style={style}
    >
      {children}
    </ElementComponent>
  )
}
