import { EditorField, EditorFieldProps } from '../types'
import { useUniqId } from '../hooks/useUniqId'
import { AbstractField } from './AbstractField'
import { prevent } from '../functions/functions'
import { useRef } from 'preact/hooks'
import { Tooltip } from '../components/Tooltip'

type FieldArgs = {
  label?: string
  required?: boolean
  help?: string
  onBrowse?: (url?: string) => Promise<string>
}

/**
 * Enregistre un champs de type texte
 */
export class ImageUrl
  extends AbstractField<FieldArgs, string>
  implements EditorField<string>
{
  field({ value, onChange }: EditorFieldProps<string>) {
    const inputRef = useRef<HTMLInputElement>(null)
    const id = useUniqId('textinput')
    const handleBrowse = () => {
      this.args.onBrowse!(value)
        .then((v) => {
          console.log('resolving to : ', v)
          onChange(v)
        })
        .catch((e) => {
          console.log('rejecting to : ', e)
        })
    }
    return (
      <div>
        {this.args.label && <label for={id}>{this.args.label}</label>}
        <div class="ve-input-icon">
          <input
            ref={inputRef}
            type="text"
            id={id}
            class="form-control"
            value={value}
            onInput={(e) => onChange((e.target as HTMLInputElement).value)}
          />
          {this.args.onBrowse && (
            <button onClick={prevent(handleBrowse)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  fill="currentColor"
                  d="M15 4.5H8.21L7.05 2.91a1 1 0 00-.8-.41H3a1 1 0 00-1 1v11a1 1 0 001 1h12a1 1 0 001-1v-9a1 1 0 00-1-1zm0 10H3v-8h3.66a1 1 0 001-1H3v-2h3.25l1.3 1.8a.5.5 0 00.4.2H15v9z"
                />
              </svg>
            </button>
          )}
        </div>
        {this.args.help && <div class="ve-form-help">{this.args.help}</div>}
        {value && (
          <Tooltip targetRef={inputRef} class="ve-imageurl-tooltip">
            <img src={value} alt="" />
          </Tooltip>
        )}
      </div>
    )
  }
}
