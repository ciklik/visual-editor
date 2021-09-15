import { AbstractField } from 'src/fields/AbstractField'
import { useUniqId } from 'src/hooks/useUniqId'

type FieldArgs = {
  label: string
  default?: boolean
}

export class Checkbox extends AbstractField<FieldArgs, boolean> {
  get defaultArgs() {
    return { default: false }
  }

  field({
    value,
    onChange,
  }: {
    value?: boolean
    onChange: (value: boolean) => void
  }) {
    const id = useUniqId('checkbox')
    return (
      <div class="ve-checkbox">
        <input
          type="checkbox"
          id={id}
          class="form-control"
          checked={value}
          onChange={(e) => onChange(!value)}
        />
        <label for={id}>{this.args.label}</label>
      </div>
    )
  }
}
