import { Field, Flex } from 'src/components/ui'
import styled from '@emotion/styled'
import { FieldGroupComponent, FieldGroupFactory } from 'src/types'
import { defineFieldGroup } from 'src/fields/utils'

type RowArgs = {
  label?: string
  columns?: string
}

const RowComponent: FieldGroupComponent<RowArgs> = ({ options, children }) => {
  return (
    <Field label={options.label}>
      <Wrapper columns={options.columns}>{children}</Wrapper>
    </Field>
  )
}

export const Row: FieldGroupFactory<RowArgs> = defineFieldGroup({
  defaultOptions: {},
  render: RowComponent,
})

const Wrapper = styled(Flex)({}, ({ columns }: { columns?: string }) =>
  columns
    ? {
        display: 'grid',
        gridTemplateColumns: columns,
        '& > *': {
          width: '100%',
        },
      }
    : {}
)
