import Styles from './Label.module.scss'
import cx from 'clsx'

type LabelProps = {
  className?: string
} & JSX.IntrinsicElements['label']

export function Label({ className, ...props }: LabelProps) {
  return <label className={cx(className, Styles.Label)} {...props} />
}
