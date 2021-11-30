import { AbstractFieldGroup } from 'src/fields/AbstractFieldGroup'
import { ReactChildren, FunctionComponent } from 'react'
import React from 'react'
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
          className="ve-row"
          style={
            this.args.columns
              ? {display: 'grid', gridTemplateColumns: this.args.columns}
              : undefined
          }
        >
          {children}
        </div>
      </div>
    )
  }
}
