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
import { FunctionComponent, SyntheticEvent } from 'react'
import Styles from './Alignment.module.scss'

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
    const handleChange = (e: SyntheticEvent) => {
      onChange((e.target as HTMLInputElement).value as FieldValue)
    }
    const alignements = [
      'left',
      'right',
      ...(this.args.vertical ? ['top', 'bottom'] : []),
    ] as FieldValue[]
    return (
      <Field label={this.args.label}>
        <div className={Styles.Alignments}>
          {alignements.map((alignment) => (
            <AlignmentButton
              key={alignment}
              alignment={alignment}
              id={id}
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
  alignment,
  id,
  onChange,
  checked,
}: {
  alignment: FieldValue
  id: string
  onChange: (e: SyntheticEvent) => void
  checked: boolean
}) {
  const IconComponent = AlignmentIcons[alignment]
  return (
    <div>
      <input
        type="radio"
        name={id}
        onChange={onChange}
        value={alignment}
        checked={checked}
      />
      <div>
        <IconComponent />
      </div>
    </div>
  )
}
