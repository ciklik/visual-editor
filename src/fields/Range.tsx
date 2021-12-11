import { EditorFieldProps } from 'src/types'
import { AbstractField } from 'src/fields/AbstractField'
import { Field } from '../components/ui/Field'
import * as Slider from '@radix-ui/react-slider'
import Styles from './Range.module.scss'

type FieldArgs = {
  label?: string
  required?: boolean
  help?: string
  default?: number
  min?: number
  max?: number
  step?: number
}

/**
 * Enregistre un champs de type texte
 */
export class Range extends AbstractField<FieldArgs, number> {
  get defaultArgs() {
    return { default: 5, min: 0, max: 5, step: 1 }
  }

  field({ value, onChange }: EditorFieldProps<number>) {
    return (
      <Field
        label={
          <>
            {this.args.label} <small>({value})</small>
          </>
        }
        help={this.args.help}
      >
        <Slider.Root
          min={this.args.min}
          max={this.args.max}
          value={[value === undefined ? this.args.default || 0 : value]}
          step={this.args.step}
          className={Styles.Range}
          onValueChange={(v) => onChange(v[0] || 0)}
        >
          <Slider.Track className={Styles.RangeTrack}>
            <Slider.Range className={Styles.RangeTrackSelected} />
          </Slider.Track>
          <Slider.Thumb className={Styles.RangeThumb} />
        </Slider.Root>
      </Field>
    )
  }
}
