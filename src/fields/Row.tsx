import { AbstractFieldGroup } from 'src/fields/AbstractFieldGroup'
import { ComponentChildren, FunctionComponent } from 'preact'

type RowArgs = {
  label?: string
  columns?: string
}

export class Row extends AbstractFieldGroup<RowArgs> {
  render: FunctionComponent = ({ children }) => {
    return (
      <div>
        {this.args.label && <label>{this.args.label}</label>}
        <div
          class="ve-row"
          style={
            this.args.columns
              ? `display: grid; grid-template-columns: ${this.args.columns}`
              : undefined
          }
        >
          {children}
        </div>
      </div>
    )
  }
}
