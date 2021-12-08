import type { ReactNode } from 'react'
import Styles from './Field.module.scss'
import { Label } from './Label'
import cx from 'clsx'
import { Tooltip } from './Tooltip'

type Option = {
  value: string
  label: string
}

type FieldProps = {
  label?: ReactNode
  help?: ReactNode
  options?: Option[]
  tooltip?: ReactNode
  icon?: ReactNode
} & JSX.IntrinsicElements['input'] &
  JSX.IntrinsicElements['textarea'] &
  JSX.IntrinsicElements['select']

export function Field({
  children,
  label,
  help,
  type = 'text',
  options,
  tooltip,
  icon,
  ...props
}: FieldProps) {
  if (!children) {
    if (options) {
      children = (
        <select {...props} className={cx(props.className, Styles.FieldInput)}>
          {options.map((option: Option, key) => {
            return (
              <option value={option.value} key={key}>
                {option.label}
              </option>
            )
          })}
        </select>
      )
    } else if (['text'].includes(type)) {
      children = (
        <input {...props} className={cx(props.className, Styles.FieldInput)} />
      )
    } else if (type === 'textarea') {
      children = (
        <textarea
          {...props}
          className={cx(props.className, Styles.FieldInput)}
        />
      )
    } else {
      throw new Error('Cannot render this type of field : ' + type)
    }
  }

  if (tooltip) {
    children = <Tooltip content={tooltip}>{children}</Tooltip>
  }

  return (
    <div>
      {label && <Label htmlFor={props.id}>{label}</Label>}
      <div className={Styles.FieldWrapper}>
        {children}
        {icon && <div className={Styles.FieldIcon}>{icon}</div>}
      </div>
      {help && <div className={Styles.FieldHelp}>{help}</div>}
    </div>
  )
}
