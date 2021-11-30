import { EditorField, EditorFieldProps, FieldCondition } from 'src/types'
import { ReactElement } from 'react'
import { cast } from 'src/functions/object'

export class AbstractField<Args extends Record<string, any>, V>
  implements EditorField<V>
{
  name: string
  protected args: Args
  conditions: FieldCondition[] = []
  variables: Record<string, string> | null = null

  constructor(name: string, args?: Args) {
    this.name = name
    this.args = { ...this.defaultArgs, ...args } as Args
    this.field = this.field.bind(this)
  }

  field({
    value,
    onChange,
  }: EditorFieldProps<V>): ReactElement {
    throw Error('La méthode field doit être implémentée')
  }

  when(fieldName: string, expectedValue: any = true) {
    this.conditions.push((data: Record<string, any>) => {
      if (typeof expectedValue === 'function') {
        return expectedValue(data[fieldName])
      }
      return cast(data[fieldName], expectedValue) === expectedValue
    })
    return this
  }

  shouldRender(data: Record<string, any>) {
    return this.conditions.filter((condition) => !condition(data)).length === 0
  }

  injectStyle(data: Record<string, any>): Record<string, string> | null {
    if (!this.variables) {
      return null
    }
    return Object.keys(this.variables).reduce((acc, key) => {
      const value = data[this.variables![key]]
      if (value) {
        return { ...acc, [`--${key}`]: `var(${value})` }
      }
      return acc
    }, {})
  }

  get defaultValue() {
    return this.args.default
  }

  get defaultArgs(): Partial<Args> {
    return {} as Args
  }
}
