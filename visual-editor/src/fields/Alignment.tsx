import { FieldComponent } from 'src/types'
import { Field, IconAlignBottom, IconAlignLeft, IconAlignRight, IconAlignTop } from 'src/components/ui'
import type { FunctionComponent } from 'react'
import { AlignmentButton } from 'src/fields/shared/AlignmentButton'
import { AlignmentButtons } from 'src/fields/shared/AlignmentButtons'
import { defineField } from 'src/fields/utils'

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

const Component: FieldComponent<FieldArgs, FieldValue> = ({value, onChange, options}) => {
  const alignements = [
    'left',
    'right',
    ...(options.vertical ? ['top', 'bottom'] : []),
  ] as FieldValue[]
  return (
    <Field label={options.label}>
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

export const Alignment = defineField<FieldArgs, FieldValue>({
  defaultOptions: {
    default: 'left' as FieldValue,
  },
  render: Component
})
