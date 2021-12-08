import { AbstractField } from 'src/fields/AbstractField'
import { useUniqId } from 'src/hooks/useUniqId'

import Styles from './Checkbox.module.scss'

type FieldArgs = {
  label: string
  default?: boolean
}

export class Checkbox extends AbstractField<FieldArgs, boolean> {
  get defaultArgs() {
    return { default: false }
  }

  field({
    value,
    onChange,
  }: {
    value?: boolean
    onChange: (value: boolean) => void
  }) {
    const id = useUniqId('checkbox')
    return (
      <div className={Styles.Checkbox}>
        <input
          type="checkbox"
          id={id}
          checked={value}
          onChange={(e) => onChange(!value)}
        />
        <label htmlFor={id}>{this.args.label}</label>
      </div>
    )
  }
}
