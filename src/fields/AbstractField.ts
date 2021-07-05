import { EditorField } from '../types'
import { VNode } from 'preact'

export class AbstractField<Args extends Record<string, any>, V> implements EditorField<V> {

  name: string
  protected args: Args
  defaultArgs: Record<string, any> = {}

  constructor (name: string, args?: Args) {
    this.name = name
    this.args = {...this.defaultArgs, ...args} as Args
    this.field = this.field.bind(this)
  }

  field ({value, onChange} : { value?: V, onChange: (value: V) => void }): VNode<any> {
    throw Error('La méthode field doit être implémentée')
  }

}
