import { AbstractFieldGroup } from 'src/fields/AbstractFieldGroup'
import { FunctionComponent } from 'react'
import { Field, Flex } from 'src/components/ui'
import styled from '@emotion/styled'

type RowArgs = {
  label?: string
  columns?: string
}

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

export class Row extends AbstractFieldGroup<RowArgs> {
  render: FunctionComponent = ({ children }) => {
    return (
      <Field label={this.args.label}>
        <Wrapper columns={this.args.columns}>{children}</Wrapper>
      </Field>
    )
  }
}
