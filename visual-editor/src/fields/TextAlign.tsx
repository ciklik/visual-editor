import { AbstractField } from 'src/fields/AbstractField'
import { EditorFieldProps } from 'src/types'
import {
  Field,
  IconTextCenter,
  IconTextLeft,
  IconTextRight,
} from 'src/components/ui'
import React, { FunctionComponent, SyntheticEvent } from 'react'
import Styles from './Alignment.module.scss'
import { AlignmentButtons } from 'src/fields/shared/AlignmentButtons'
import { AlignmentButton } from 'src/fields/shared/AlignmentButton'

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
    const alignements = Object.keys(AlignmentIcons) as FieldValue[]
    return (
      <Field label={this.args.label}>
        <AlignmentButtons>
          {alignements.map((alignment) => (
            <AlignmentButton<FieldValue>
              key={alignment}
              value={alignment}
              checked={value === alignment}
              onChange={onChange}
              icon={AlignmentIcons[alignment] as FunctionComponent}
            />
          ))}
        </AlignmentButtons>
      </Field>
    )
  }
}
