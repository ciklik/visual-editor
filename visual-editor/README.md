# Visual Editor

[![npm version](https://badge.fury.io/js/@boxraiser%2Fvisual-editor.svg)](https://badge.fury.io/js/@boxraiser%2Fvisual-editor)
[![Tests](https://github.com/boxraiser/visual-editor/actions/workflows/test.yml/badge.svg)](https://github.com/boxraiser/visual-editor/actions/workflows/test.yml)

[Documentation](http://boxraiser.github.io/visual-editor/)

## Getting started

The editor uses custom element, you first have to register your page before registering the element. Then you can use it anywhere you want in your HTML document.

### Registering your page components

Start by instantiating the editor.

```js
import { VisualEditor } from '@boxraiser/visual-editor'
import '@boxraiser/visual-editor/style.css'

let editor = new VisualEditor()
```

Then register your page components using the `registerComponent` method that expect 2 parameters

- A unique identifier for the block (string)
- An option object object (see [EditorComponentDefinition](https://github.com/Grafikart/VisualEditor/blob/master/src/types.ts#L24) for more information)

```js
import { HTMLText, Repeater, Text, Row, Select } from '@boxraiser/visual-editor'

// Register a component / block
editor.registerComponent('hero', {
  title: 'Hero',
  category: 'Banner',
  fields: [
    new Text('title', {multiline: false}),
    new HTMLText('content'),
    new Repeater('buttons', {
      title: 'Boutons',
      addLabel: 'Add a new button',
      fields: [
        new Row([
          new Text('label', { label: 'Libellé', default: 'Call to action' }),
          new Text('url', { label: 'Lien' }),
          new Select('type', {
            default: 'primary',
            label: 'type',
            options: [
              { label: 'Primaire', value: 'primary' },
              { label: 'Secondaire', value: 'secondary' },
            ],
          }),
        ])
      ],
    })
  ],
})
```

When all your components are registered you can define the custom element using the `defineElement` method.

```js
editor.defineElement()
```

## Add the editor on your page

You now have a custom element `visual-editor` that you can use to display the editor.

```html
<visual-editor
  hidden
  name="content"
  preview="http://localhost:3000/preview"
  iconsUrl="/assets/editor/[name].svg"
  value="[]"
></visual-editor>
```

There are multiple attributes :

- `hidden`, toggle this attribute to show or hide the editor
- `name`, name for the field (will be passed to an hidden textarea)
- `preview`, endpoint called to render the preview
- `iconsUrl`, path used to resolve component icons URL ([name] will be replaced by the ID of the component)
- `value` (optional), will set the default value for the editor (expect a JSON array)

The custom element will create a hidden field that will be used to store the data, no need for additional JavaScript you will receive the data when the form is submitted.

### How the data is formatted ?

The data use a simple structure (to be usable with any framework or technology)

```json
 [
  {
    "_name": "hero",
    "<fieldname>": "<value>",
    "<fieldname>": "<value>",
    "<fieldname>": "<value>"
  },
  {
    "_name": "hero",
    "<fieldname>": "<value>",
    "<fieldname>": "<value>",
    "<fieldname>": "<value>"
  }
]
```

A real world example

```json
[
  {
    "title": "Album example",
    "titleAlign": "center",
    "content": "<p>Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>",
    "buttons": [
      {
        "label": "Main call to action",
        "url": "#",
        "type": "primary"
      },
      {
        "label": "Secondary action",
        "url": "#",
        "type": "secondary"
      }
    ],
    "backgroundSize": "cover",
    "backgroundRepeat": "no-repeat",
    "backgroundXPosition": "center",
    "backgroundYPosition": "center",
    "padding": 5,
    "_name": "hero",
    "backgroundColor": null,
    "textColor": "--bs-primary",
    "background": "",
    "backgroundMobile": ""
  },
  {
    "icons": [
      {
        "title": "Pro",
        "content": "<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>"
      },
      {
        "title": "Pro",
        "content": "<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>"
      },
      {
        "title": "Pro",
        "content": "<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>"
      }
    ],
    "backgroundSize": "cover",
    "backgroundRepeat": "no-repeat",
    "backgroundXPosition": "center",
    "backgroundYPosition": "center",
    "padding": 5,
    "_name": "icons-columns"
  },
  {
    "title": "Pricing",
    "titleAlign": "center",
    "content": "<p>Quickly build an effective pricing table for your potential customers with this Bootstrap example. It’s built with default Bootstrap components and utilities with little customization.</p>",
    "prices": [
      {
        "title": "Free",
        "price": "0€",
        "features": "10 users included\n2 GB of storage\nEmail support\nHelp center access",
        "label": "Sign up for free",
        "url": "#",
        "type": "secondary"
      },
      {
        "title": "Pro",
        "price": "15€",
        "features": "20 users included\n10 GB of storage\nPriority email support\nHelp center access",
        "label": "Get started",
        "url": "#",
        "type": "primary"
      },
      {
        "title": "Enterprise",
        "price": "29€",
        "features": "30 users included\n15 GB of storage\nPhone and email support\nHelp center access",
        "label": "Contact us",
        "url": "#",
        "type": "primary"
      }
    ],
    "backgroundSize": "cover",
    "backgroundRepeat": "no-repeat",
    "backgroundXPosition": "center",
    "backgroundYPosition": "center",
    "padding": 5,
    "_name": "pricing"
  },
  {
    "title": "Lorem ipsum dolor sit amet",
    "titleAlign": "right",
    "content": "<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>",
    "buttons": [
      {
        "label": "Call to action",
        "url": "",
        "type": "primary"
      },
      {
        "label": "Call to action",
        "url": "",
        "type": "secondary"
      }
    ],
    "backgroundSize": "cover",
    "backgroundRepeat": "no-repeat",
    "backgroundXPosition": "center",
    "backgroundYPosition": "center",
    "padding": 3,
    "_name": "hero",
    "backgroundColor": null
  }
]
```
