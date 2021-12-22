import { EditorFieldProps } from 'src/types'
import { useUniqId } from 'src/hooks/useUniqId'
import { AbstractField } from 'src/fields/AbstractField'
import { prevent } from 'src/functions/functions'
import Styles from './ImageUrl.module.scss'
import { ButtonIcon, Field, IconFolder } from 'src/components/ui'

type FieldArgs = {
  label?: string
  required?: boolean
  help?: string
  onBrowse?: (url?: string) => Promise<string>
}

/**
 * Enregistre un champs de type texte
 */
export class ImageUrl extends AbstractField<FieldArgs, string> {
  field({ value, onChange }: EditorFieldProps<string>) {
    const id = useUniqId('textinput')
    const handleBrowse = () => {
      this.args.onBrowse!(value)
        .then((v) => {
          onChange(v)
        })
        .catch((e) => {})
    }

    return (
      <Field
        id={id}
        label={this.args.label}
        help={this.args.help}
        value={value}
        tooltip={value ? <TooltipImage url={value} /> : undefined}
        onChange={(e) => onChange((e.target as HTMLInputElement).value)}
        className={Styles.ImageUrlInput}
        icon={
          this.args.onBrowse ? (
            <ButtonIcon
              onClick={prevent(handleBrowse)}
              className={Styles.ImageUrlBrowseButton}
            >
              <IconFolder size={16} />
            </ButtonIcon>
          ) : undefined
        }
      />
    )
  }
}

function TooltipImage({ url }: { url?: string }) {
  if (!url) {
    return null
  }
  return <img src={url} alt="" className={Styles.ImageUrlTooltip} />
}
