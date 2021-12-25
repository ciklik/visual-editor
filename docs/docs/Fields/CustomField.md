---
sidebar_position: 1000
---

# Custom Field

You can create custom field 

```jsx
import { AbstractField } from 'visual-editor'

/**
 * @property args Field arguments merged with default 
 */
export class MyCustomField extends AbstractField {

  // Set the default arguments for this field
  get defaultArgs() {
    return {
      multiline: true,
      allowHeadings: false,
      default: '', // Set the default value for this field
    }
  }

  /**
   * Function used to render the field
   * @param {T} value The value set by the user
   * @param {(T) => void} onChange A callback to call when the value change (expect the value as a parameter)
   * @returns {JSX.Element}
   */
  field({ value, onChange }) {
    return (
      <Field label={this.args.label} help={this.args.help}>
        <div className={Styles.HTMLText}>
          <QuillEditor
            value={value || ''}
            onChange={onChange}
            mode={this.fieldType()}
            colors={this.args.colors}
          />
        </div>
      </Field>
    )
  }
}
```

Then, you can use your field when creating new blocks

```jsx
// The arguments will be merged with the default arguments
new MyCustomField('title', {
  label: 'Title',
  default: 'Pro',
  multiline: false,
})
```
