import { FieldComponent } from 'src/types'
import { useUniqId } from 'src/hooks/useUniqId'
import { prevent } from 'src/functions/functions'
import { ButtonIcon, Field, IconFolder } from 'src/components/ui'
import styled from '@emotion/styled'
import { defineField } from 'src/fields/utils'

type FieldArgs = {
  label?: string
  help?: string
  default?: string
  onBrowse?: (url?: string) => Promise<string>
}

const Component: FieldComponent<FieldArgs, string> = ({
  value,
  onChange,
  options,
}) => {
  const id = useUniqId('imageinput')
  const handleBrowse = () => {
    options.onBrowse!(value)
      .then((v) => {
        onChange(v)
      })
      .catch((e) => {})
  }

  return (
    <Field
      id={id}
      label={options.label}
      help={options.help}
      value={value}
      tooltip={value ? <TooltipImage src={value} alt="" /> : undefined}
      onChange={(e) => onChange((e.target as HTMLInputElement).value)}
      css={{ paddingRight: 40 }}
      icon={
        options.onBrowse ? (
          <Button onClick={prevent(handleBrowse)}>
            <IconFolder size={16} />
          </Button>
        ) : undefined
      }
    />
  )
}

export const ImageUrl = defineField<FieldArgs, string>({
  defaultOptions: {
    default: '',
  },
  render: Component,
})

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
