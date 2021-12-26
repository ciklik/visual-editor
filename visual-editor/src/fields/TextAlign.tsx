import { AbstractField } from 'src/fields/AbstractField'
import { EditorFieldProps } from 'src/types'
import {
  Field,
  IconTextCenter,
  IconTextLeft,
  IconTextRight,
} from 'src/components/ui'
import React, { SyntheticEvent } from 'react'
import Styles from './Alignment.module.scss'

const AlignmentIcons = {
  left: IconTextLeft,
  center: IconTextCenter,
  right: IconTextRight,
}

type FieldValue = keyof typeof AlignmentIcons

type FieldArgs = {
  label?: string
  vertical?: boolean
  default?: FieldValue
}

export class TextAlign extends AbstractField<FieldArgs, FieldValue> {
  get defaultArgs() {
    return {
      default: 'left' as FieldValue,
    }
  }

  field({ value, onChange }: EditorFieldProps<FieldValue>) {
    const handleChange = (e: SyntheticEvent) => {
      onChange((e.target as HTMLInputElement).value as FieldValue)
    }
    const alignements = Object.keys(AlignmentIcons) as FieldValue[]
    return (
      <Field label={this.args.label}>
        <div className={Styles.Alignments}>
          {alignements.map((alignment) => (
            <AlignmentButton
              key={alignment}
              value={alignment}
              checked={value === alignment}
              onChange={handleChange}
            />
          ))}
        </div>
      </Field>
    )
  }
}

function AlignmentButton({
  value,
  onChange,
  checked,
}: {
  value: FieldValue
  onChange: (e: SyntheticEvent) => void
  checked: boolean
}) {
  const IconComponent = AlignmentIcons[value]
  return (
    <div className={Styles.AlignmentsButton}>
      <input type="radio" onChange={onChange} value={value} checked={checked} />
      <div>
        <IconComponent />
      </div>
    </div>
  )
}
