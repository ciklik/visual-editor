import { EditorField } from 'src/types'
import { VNode } from 'preact'
import { cast } from '../functions/object'

type FieldCondition = (data: Record<string, any>) => boolean

export class AbstractField<Args extends Record<string, any>, V>
  implements EditorField<V>
{
  name: string
  protected args: Args
  conditions: FieldCondition[] = []

  constructor(name: string, args?: Args) {
    this.name = name
    this.args = { ...this.defaultArgs, ...args } as Args
    this.field = this.field.bind(this)
  }

  field({
    value,
    onChange,
  }: {
    value?: V
    onChange: (value: V) => void
  }): VNode<any> {
    throw Error('La méthode field doit être implémentée')
  }

  when(fieldName: string, expectedValue: any) {
    this.conditions.push(
      (data: Record<string, any>) =>
        cast(data[fieldName], expectedValue) === expectedValue
    )
    return this
  }

  shouldRender(data: Record<string, any>) {
    return this.conditions.filter((condition) => !condition(data)).length === 0
  }

  get defaultValue() {
    return this.args.default
  }

  get defaultArgs(): Partial<Args> {
    return {} as Args
  }
}
