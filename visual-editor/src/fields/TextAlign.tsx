import { FieldComponent } from 'src/types'
import { Field, IconTextCenter, IconTextLeft, IconTextRight } from 'src/components/ui'
import React, { FunctionComponent } from 'react'
import { AlignmentButtons } from 'src/fields/shared/AlignmentButtons'
import { AlignmentButton } from 'src/fields/shared/AlignmentButton'
import { defineField } from 'src/fields/utils'

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

const Component: FieldComponent<FieldArgs, string> = ({value, onChange, options}) => {
  const alignements = Object.keys(AlignmentIcons) as FieldValue[]
  return (
    <Field label={options.label}>
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

export const TextAlign = defineField<FieldArgs, string>({
  defaultOptions: {
    default: 'left' as FieldValue,
  },
  render: Component
})

