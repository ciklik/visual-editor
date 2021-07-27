import { AbstractField } from 'src/fields/AbstractField'
import { EditorFieldProps } from '../types'
import {
  IconAlignBottom,
  IconAlignLeft,
  IconAlignRight,
  IconAlignTop,
} from 'src/components/Icons'
import { uniqId } from '../functions/string'
import { FunctionComponent } from 'preact'

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
    const handleChange = (e: Event) => {
      onChange((e.target as HTMLInputElement).value as FieldValue)
    }
    const alignements = [
      'left',
      'right',
      ...(this.args.vertical ? ['top', 'bottom'] : []),
    ] as FieldValue[]
    return (
      <div>
        {this.args.label && <label>{this.args.label}</label>}
        <div class="ve-alignments">
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
      </div>
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
  onChange: (e: Event) => void
  checked: boolean
}) {
  const IconComponent = AlignmentIcons[alignment]
  return (
    <div key={alignment} class="ve-alignment">
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
