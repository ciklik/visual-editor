import { AbstractField } from 'src/fields/AbstractField'
import { EditorFieldProps } from 'src/types'
import {
  Field,
  IconAlignBottom,
  IconAlignLeft,
  IconAlignRight,
  IconAlignTop,
} from 'src/components/ui'
import { uniqId } from 'src/functions/string'
import { FunctionComponent } from 'react'
import { AlignmentButton } from 'src/fields/shared/AlignmentButton'
import { AlignmentButtons } from 'src/fields/shared/AlignmentButtons'

type FieldArgs = {
  label?: string
  vertical?: boolean
  default?: FieldValue
}

type FieldValue = 'top' | 'right' | 'bottom' | 'left'

const AlignmentIcons = {
  top: IconAlignTop,
  left: IconAlignLeft,
  bottom: IconAlignBottom,
  right: IconAlignRight,
} as Record<FieldValue, FunctionComponent>

export class Alignment extends AbstractField<FieldArgs, FieldValue> {
  get defaultArgs() {
    return {
      default: 'left' as FieldValue,
    }
  }

  field({ value, onChange }: EditorFieldProps<FieldValue>) {
    const id = uniqId()
    const alignements = [
      'left',
      'right',
      ...(this.args.vertical ? ['top', 'bottom'] : []),
    ] as FieldValue[]
    return (
      <Field label={this.args.label}>
        <AlignmentButtons>
          {alignements.map((alignment) => (
            <AlignmentButton<FieldValue>
              key={alignment}
              value={alignment}
              checked={value === alignment}
              onChange={onChange}
              icon={AlignmentIcons[alignment]}
            />
          ))}
        </AlignmentButtons>
      </Field>
    )
  }
}
