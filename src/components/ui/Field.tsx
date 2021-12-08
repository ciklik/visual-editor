import type { ReactNode } from 'react'
import Styles from './Field.module.scss'
import { Label } from './Label'
import cx from 'clsx'

type FieldProps = {
  label?: ReactNode
  help?: ReactNode
} & JSX.IntrinsicElements['input'] &
  JSX.IntrinsicElements['textarea']

export function Field({
  children,
  label,
  help,
  type = 'text',
  ...props
}: FieldProps) {
  if (!children) {
    children = (
      <>
        {['text'].includes(type) && (
          <input
            {...props}
            className={cx(props.className, Styles.FieldInput)}
          />
        )}
        {type === 'textarea' && (
          <textarea
            {...props}
            className={cx(props.className, Styles.FieldInput)}
          />
        )}
      </>
    )
  }
  return (
    <div>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      {children}
      {help && <div className={Styles.FieldHelp}>{help}</div>}
    </div>
  )
}
