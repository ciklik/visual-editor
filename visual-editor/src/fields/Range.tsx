import { FieldComponent } from 'src/types'
import { Field, Styles } from 'src/components/ui'
import * as Slider from '@radix-ui/react-slider'
import styled from '@emotion/styled'
import { defineField } from 'src/fields/utils'

type FieldArgs = {
  label?: string
  help?: string
  default?: number
  min?: number
  max?: number
  step?: number
}

const Component: FieldComponent<FieldArgs, number> = ({ value, onChange, options }) => {
  return (
    <Field
      label={
        <>
          {options.label} <small>({value})</small>
        </>
      }
      help={options.help}
    >
      <Root
        min={options.min}
        max={options.max}
        value={[value === undefined ? options.default || 0 : value]}
        step={options.step}
        onValueChange={(v) => onChange(v[0] || 0)}
      >
        <Track>
          <TrackSelected />
        </Track>
        <Cursor />
      </Root>
    </Field>
  )
}

export const Range = defineField<FieldArgs, number>({
  defaultOptions: {
    default: 5, min: 0, max: 5, step: 1,
  },
  render: Component,
})


const Root = styled(Slider.Root)({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  touchAction: 'none',
  width: '100%',
  height: '20px',
})

const Track = styled(Slider.Track)({
  position: 'relative',
  display: 'block',
  height: '5px',
  backgroundColor: 'var(--ve-field-border)',
  width: '100%',
  borderRadius: '5px',
})

const TrackSelected = styled(Slider.Range)({
  position: 'absolute',
  left: '0',
  height: '100%',
  display: 'block',
  borderRadius: '5px',
  backgroundColor: 'var(--ve-primary)',
})

const Cursor = styled(Slider.Thumb)({
  display: 'block',
  backgroundColor: '#FFF',
  width: '20px',
  height: '20px',
  borderRadius: '20px',
  boxShadow:
    'rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px',
  cursor: 'pointer',
  border: '1px solid var(--ve-field-border)',
  '&:focus': Styles.FocusState
})
