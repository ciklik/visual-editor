import { FieldComponent } from 'src/types'
import {
  Field,
  IconTextCenter,
  IconTextLeft,
  IconTextRight,
} from 'src/components/ui'
import React, { FunctionComponent } from 'react'
import { AlignmentButtons } from 'src/fields/shared/AlignmentButtons'
import { AlignmentButton } from 'src/fields/shared/AlignmentButton'
import { defineField } from 'src/fields/utils'
import { useUniqId } from 'src/hooks/useUniqId'

const AlignmentIcons = {
  left: IconTextLeft,
  center: IconTextCenter,
  right: IconTextRight,
}

type FieldValue = keyof typeof AlignmentIcons

type FieldArgs = {
  label?: string
  default?: FieldValue
}

const Component: FieldComponent<FieldArgs, string> = ({
  value,
  onChange,
  options,
}) => {
  const alignements = Object.keys(AlignmentIcons) as FieldValue[]
  const id = useUniqId('textaligninput')
  return (
    <Field label={options.label}>
      <AlignmentButtons>
        {alignements.map((alignment) => (
          <AlignmentButton<FieldValue>
            key={alignment}
            id={id}
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
  render: Component,
})
