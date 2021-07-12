import { EditorField } from 'src/types'
import { FunctionComponent, h } from 'preact'

export class AbstractFieldGroup<A extends Record<string, any>> {
  fields: Array<EditorField<any> | AbstractFieldGroup<any>>
  args: A

  constructor(
    children: Array<EditorField<any> | AbstractFieldGroup<any>>,
    args: A = {} as A
  ) {
    this.fields = children
    this.args = args
  }

  render: FunctionComponent<{}> = () => {
    return h('div', {}, 'Vous devez implémenter la méthode render')
  }
}
