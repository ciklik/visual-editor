import cx from 'clsx'
import Styles from './Button.module.scss'

type ButtonProps = Omit<JSX.IntrinsicElements['button'], 'icon'> & {
  secondary?: boolean
  icon?: (...args: any) => JSX.Element
  className?: string
  size?: 'small' | 'default'
}

export function Button({
  children,
  icon: IconElement,
  size = 'default',
  secondary = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(
        Styles.Button,
        secondary && Styles.ButtonSecondary,
        size === 'small' && Styles.ButtonSmall,
        className
      )}
      {...props}
    >
      {IconElement && <IconElement size={20} />}
      {children}
    </button>
  )
}
