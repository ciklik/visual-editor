import { EditorField } from '../types'
import { uniqId } from '../functions/string'
import { useUniqId } from '../hooks/useUniqId'

type textArgs = {
  label?: string,
  required?: boolean,
  multiline?: boolean,
  help?: string
}

let id = 0;

/**
 * Enregistre un champs de type texte
 */
export class Text implements EditorField {

  name: string
  private args: textArgs = {}

  constructor (name: string, args: textArgs) {
    this.name = name
    this.args = args
  }

  public field = ({ value, onChange }: { value: string, onChange: (value: any) => void }) => {
    const id = useUniqId('textinput')
    return <div class="form-group">
      {this.args.label && <label for={id} class="form-label">{this.args.label}</label>}
      {this.args.multiline ?
        <textarea id={id} class="form-control" defaultValue={value} onInput={e => onChange(e.target.value)}/> :
        <input type="text" id={id} class="form-control" defaultValue={value} onInput={e => onChange(e.target.value)}/>
      }
      {this.args.help && <div class="form-text">{this.args.help}</div>}
    </div>
  }
}

