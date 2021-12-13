import { AbstractFieldGroup } from 'src/fields/AbstractFieldGroup'
import { FunctionComponent } from 'react'
import { Field, Flex } from 'src/components/ui'
import Styles from './Row.module.scss'

type RowArgs = {
  label?: string
  columns?: string
}

export class Row extends AbstractFieldGroup<RowArgs> {
  render: FunctionComponent = ({ children }) => {
    return (
      <Field label={this.args.label}>
        <Flex
          className={this.args.columns ? undefined : Styles.Row}
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
