import { AbstractFieldGroup } from 'src/fields/AbstractFieldGroup'
import { FunctionComponent } from 'react'
import { Flex } from '../components/ui/Flex'
import { Field } from '../components/ui/Field'

type RowArgs = {
  label?: string
  columns?: string
}

export class Row extends AbstractFieldGroup<RowArgs> {
  render: FunctionComponent = ({ children }) => {
    return (
      <Field label={this.args.label}>
        <Flex
          style={
            this.args.columns
              ? { display: 'grid', gridTemplateColumns: this.args.columns }
              : undefined
          }
        >
          {children}
        </Flex>
      </Field>
    )
  }
}
