import Styles from './Flex.module.scss'
import cx from 'clsx'
import { forwardRef, FunctionComponent, ReactNode } from 'react'

type FlexProps = {
  between?: boolean
  children: ReactNode
  as?: FunctionComponent<any> | string
  column?: boolean
  gap?: number
} & JSX.IntrinsicElements['div']

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      as: ElementComponent = 'div',
      between,
      gap,
      children,
      className,
      column,
      style: styleProps,
      ...props
    },
    ref
  ) => {
    const style =
      gap !== undefined
        ? { '--ve-gap': `${gap}rem`, ...styleProps }
        : styleProps
    return (
      <ElementComponent
        {...props}
        ref={ref}
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
)

Flex.displayName = 'Flex'
