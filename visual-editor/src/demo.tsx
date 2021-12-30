import {
  HTMLText,
  Repeater,
  Text,
  VisualEditor,
  Number as NumberField,
  Checkbox,
  Range,
  Select,
  Alignment,
  TextAlign,
  Row, Tabs,
} from 'src/VisualEditor'
import {
  ButtonField,
  ButtonsField,
  ColorField,
  ContentField,
  ImageField,
  TitleField,
  WithStyles,
} from './shared'

let editor = new VisualEditor()

editor.registerComponent('hero', {
  title: 'Hero',
  fields: [
    Text('title', {
      label: 'Hello world',
      multiline: true
    })
  ]
})

editor.registerComponent('hero', {
  title: 'Hero',
  fields: WithStyles([TitleField(), ContentField(), ButtonsField()]),
})

editor.registerComponent('pricing', {
  title: 'Pricing',
  category: 'Commerce',
  fields: WithStyles([
    TitleField(),
    ContentField(),
    Repeater('prices', {
      min: 1,
      max: 5,
      collapsed: 'title',
      fields: [
        HTMLText('title', {
          label: 'Title',
          default: 'Pro',
          multiline: false,
        }),
        Text('price', { label: 'Price', default: '15€' }),
        Text('features', { label: 'Features', multiline: true }),
        ButtonField(),
      ],
    }),
  ]),
})

editor.registerComponent('icons-columns', {
  title: 'Icons columns',
  fields: WithStyles([
    Repeater('icons', {
      min: 1,
      max: 5,
      collapsed: 'title',
      fields: [
        Text('title', { label: 'Title', default: 'Featured title' }),
        ContentField(),
      ],
    }),
  ]),
})

editor.registerComponent('demo', {
  title: 'All field',
  fields: [
    Text('text', { label: 'Text' }),
    HTMLText('htmltext', { label: 'HTMLText' }),
    ContentField('htmltextarea'),
    NumberField('number', { label: 'Number' }),
    Checkbox('checkbox', { label: 'Checkbox' }),
    Checkbox('checkbox1', { label: 'Checkbox 1' }).when('checkbox', true),
    Checkbox('checkbox2', { label: 'Checkbox 2' }).when('checkbox1', (v: boolean) => v),
    ImageField(),
    ColorField('color', 'Colors'),
    Range('range', { min: 0, max: 100, label: 'Range' }),
    Select('select', { options: [
        {label: 'Option 1', value: '1'},
        {label: 'Option 2', value: '2'}
      ], label: 'Select' }),
    Alignment('alignment', { vertical: true, label: 'Alignment' }),
    TextAlign('textalign', { vertical: true, label: 'TextAlign' }),
    Row([Text('text1'), Text('text2'), Text('text3')]),
    Tabs(
      {
        label: 'Content',
        fields: [Text('text4', {label: 'Content'})],
      },
      {
        label: 'Settings',
        fields: [Text('text5', {label: 'Settings'})],
      }
    ),
    Repeater('repeater', {
      label: 'Repeater',
      fields: [Text('text1'), Text('text2'), Text('text3')],
    }),
  ],
})

editor.registerComponent('text', {
  title: 'Formatted text',
  fields: [ContentField()],
})

editor.defineElement()
