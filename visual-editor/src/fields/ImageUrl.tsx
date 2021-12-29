import { EditorFieldProps } from 'src/types'
import { useUniqId } from 'src/hooks/useUniqId'
import { AbstractField } from 'src/fields/AbstractField'
import { prevent } from 'src/functions/functions'
import { ButtonIcon, Field, IconFolder } from 'src/components/ui'
import styled from '@emotion/styled'

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
        tooltip={value ? <TooltipImage src={value} alt="" /> : undefined}
        onChange={(e) => onChange((e.target as HTMLInputElement).value)}
        css={{ paddingRight: 40 }}
        icon={
          this.args.onBrowse ? (
            <Button onClick={prevent(handleBrowse)}>
              <IconFolder size={16} />
            </Button>
          ) : undefined
        }
      />
    )
  }
}

const Button = styled(ButtonIcon)({
  width: '32px',
  height: '32px',
  color: 'var(--ve-color-light)',
})

const TooltipImage = styled.img({
  width: '150px',
  height: '150px',
  position: 'relative',
  zIndex: 2,
  objectFit: 'cover',
})
