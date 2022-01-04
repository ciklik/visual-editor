import { Field, Flex } from 'src/components/ui'
import styled from '@emotion/styled'
import { FieldGroupComponent } from 'src/types'
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

export const Row = defineFieldGroup<RowArgs>({
  defaultOptions: {},
  render: RowComponent,
})

const Wrapper = styled(Flex)(
  {
    '& > *': {
      width: '100%',
    },
  },
  ({ columns }: { columns?: string }) =>
    columns
      ? {
          display: 'grid',
          gridTemplateColumns: columns,
        }
      : {}
)
