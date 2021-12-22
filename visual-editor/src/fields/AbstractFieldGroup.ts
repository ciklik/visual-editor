import { EditorField, FieldCondition } from 'src/types'
import { createElement, FunctionComponent, ReactElement } from 'react'
import { cast } from 'src/functions/object'

export class AbstractFieldGroup<A extends Record<string, any>> {
  fields: Array<EditorField<any> | AbstractFieldGroup<any>>
  args: A
  conditions: FieldCondition[] = []

  constructor (
    children: Array<EditorField<any> | AbstractFieldGroup<any>>,
    args: A = {} as A,
  ) {
    this.fields = children
    this.args = args
  }

  render: FunctionComponent<{ children: ReactElement }> = () => {
    return createElement('div', {}, 'Vous devez implémenter la méthode render')
  }

  when (fieldName: string, expectedValue: any = true) {
    this.conditions.push((data: Record<string, any>) => {
      if (typeof expectedValue === 'function') {
        return expectedValue(data[fieldName])
      }
      return cast(data[fieldName], expectedValue) === expectedValue
    })
    return this
  }

  shouldRender (data: Record<string, any>) {
    return this.conditions.filter((condition) => !condition(data)).length === 0
  }
}
