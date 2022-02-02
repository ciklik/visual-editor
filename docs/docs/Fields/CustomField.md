---
sidebar_position: 1000
---

# Custom Field

You can create custom field. You'll need to create a function that returns an object.

```ts
type SingleFieldDefinition<O, V> = {
  // Name of the field
  name: string, 
  // Options will be passed when rendering the component
  options: O, 
  // Function to render the component in the editor
  render: FunctionComponent<{value: V, onChange: (v: V) => void, options: O}>,
  // Allow conditional rendering depending of the component data
  shouldRender: (data: Record<string, unknown>) => boolean,
  // You can compute extra props using the component data
  extraProps?: (data: Record<string, unknown>) => Record<string, any>,
}
```

For instance

```tsx
import { Field, React } from '@boxraiser/visual-editor'

const Component = ({
  value,
  onChange,
  options,
}) => {
  return (
    <Field label={options.label} help={options.help}>
      <TiptapEditor
        value={value}
        onChange={onChange}
        multiline={options.multiline}
      />
    </Field>
  )
}

export const MyCustomField = (name, options) => {
  return {
    name: name,
    options: {
      multiline: true,
      allowHeadings: false,
      default: '',
      ...options,
    },
    render: Component,
    shouldRender: () => true,
  }
}
```

For simple fields you can use the `defineField` and `defineFieldGroup` helper function.

```tsx
import { Field, defineField, React } from '@boxraiser/visual-editor'

const Component = ({ value, onChange, options }) => {
  return <div>
      <input value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
}

export const Number = defineField({
  defaultOptions: {
    default: '',
  },
  render: Component,
})
```

You can check how [it is used internally](https://github.com/boxraiser/visual-editor/tree/main/visual-editor/src/fields)
