import { AbstractFieldGroup } from 'src/fields/AbstractFieldGroup'
import { FunctionComponent } from 'react'
import { Label } from '../components/ui/Label'
import { Flex } from '../components/ui/Flex'

type RowArgs = {
  label?: string
  columns?: string
}

export class Row extends AbstractFieldGroup<RowArgs> {
  render: FunctionComponent = ({ children }) => {
    return (
      <div>
        <Label>{this.args.label}</Label>
        <Flex
          style={
            this.args.columns
              ? { display: 'grid', gridTemplateColumns: this.args.columns }
              : undefined
          }
        >
          {children}
        </Flex>
      </div>
    )
  }
}
