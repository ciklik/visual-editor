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
  Row,
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
  fields: WithStyles([TitleField(), ContentField(), ButtonsField()]),
})

editor.registerComponent('pricing', {
  title: 'Pricing',
  category: 'Commerce',
  fields: WithStyles([
    TitleField(),
    ContentField(),
    new Repeater('prices', {
      min: 1,
      max: 5,
      collapsed: 'title',
      fields: [
        new HTMLText('title', {
          label: 'Title',
          default: 'Pro',
          multiline: false,
        }),
        new Text('price', { label: 'Price', default: '15€' }),
        new Text('features', { label: 'Features', multiline: true }),
        ButtonField(),
      ],
    }),
  ]),
})

editor.registerComponent('icons-columns', {
  title: 'Icons columns',
  fields: WithStyles([
    new Repeater('icons', {
      min: 1,
      max: 5,
      collapsed: 'title',
      fields: [
        new Text('title', { label: 'Title', default: 'Featured title' }),
        ContentField(),
      ],
    }),
  ]),
})

editor.registerComponent('demo', {
  title: 'All field',
  fields: [
    new Text('text', { label: 'Text' }),
    new HTMLText('htmltext', { label: 'HTMLText' }),
    new NumberField('number', { label: 'Number' }),
    new Checkbox('checkbox', { label: 'Checkbox' }),
    ImageField(),
    ColorField('color', 'Colors'),
    new Range('range', { min: 0, max: 100, label: 'Range' }),
    new Select('select', { options: [], label: 'Select' }),
    new Alignment('alignment', { vertical: true, label: 'Alignment' }),
    new TextAlign('text', { vertical: true, label: 'TextAlign' }),
    new Row([new Text('text1'), new Text('text2'), new Text('text3')]),
    new Repeater('repeater', {
      label: 'Repeater',
      fields: [new Text('text1'), new Text('text2'), new Text('text3')],
    }),
  ],
})

editor.registerComponent('text', {
  title: 'Formatted text',
  fields: [ContentField()],
})

editor.defineElement()
