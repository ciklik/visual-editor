import {
  Alignment,
  Checkbox,
  DatePicker,
  EN,
  HTMLText,
  Number as NumberField,
  Range,
  Repeater,
  Row,
  Select,
  Tabs,
  Text,
  TextAlign,
  VisualEditor,
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

let editor = new VisualEditor({
  lang: EN,
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
    DatePicker('date', { label: 'Date' }),
    Text('text', { label: 'Text' }),
    HTMLText('htmltext', { label: 'HTMLText', multiline: false }),
    ContentField('htmltextarea'),
    NumberField('number', { label: 'Number' }),
    Checkbox('checkbox', { label: 'Checkbox' }),
    Checkbox('checkbox1', { label: 'Checkbox 1' }).when('checkbox', true),
    Checkbox('checkbox2', { label: 'Checkbox 2' }).when(
      'checkbox1',
      (v: boolean) => v
    ),
    ImageField(),
    ColorField('color', 'Colors'),
    Range('range', { min: 0, max: 100, label: 'Range' }),
    Select('select', {
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ],
      label: 'Select',
    }),
    Alignment('alignment', { vertical: true, label: 'Alignment' }),
    TextAlign('textalign', { label: 'TextAlign' }),
    Row([Text('text1'), Text('text2'), Text('text3')]),
    Tabs(
      {
        label: 'Content',
        fields: [Text('text4', { label: 'Content' })],
      },
      {
        label: 'Settings',
        fields: [Text('text5', { label: 'Settings' })],
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

editor.registerTemplate({
  name: 'Template de test',
  image:
    'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.fotolip.com%2Fwp-content%2Fuploads%2F2016%2F05%2FWebsite-Templates-8.jpg&f=1&nofb=1',
  description: 'Template multicolonne',
  data: [
    {
      title: 'Album example',
      titleAlign: 'left',
      content:
        "<p>Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>",
      buttons: [
        {
          label: 'Main call to action',
          url: '#',
          type: 'primary',
        },
        {
          label: 'Secondary action',
          url: '#',
          type: 'secondary',
        },
      ],
      _name: 'hero',
    },
    {
      title: 'Album example',
      titleAlign: 'left',
      content:
        "<p>Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>",
      buttons: [
        {
          label: 'Main call to action',
          url: '#',
          type: 'primary',
        },
        {
          label: 'Secondary action',
          url: '#',
          type: 'secondary',
        },
      ],
      _name: 'hero',
    },
    {
      title: 'Album example',
      titleAlign: 'left',
      content:
        "<p>Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>",
      buttons: [
        {
          label: 'Main call to action',
          url: '#',
          type: 'primary',
        },
        {
          label: 'Secondary action',
          url: '#',
          type: 'secondary',
        },
      ],
      _name: 'hero',
    },
    {
      title: 'Album example',
      titleAlign: 'left',
      content:
        "<p>Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>",
      buttons: [
        {
          label: 'Main call to action',
          url: '#',
          type: 'primary',
        },
        {
          label: 'Secondary action',
          url: '#',
          type: 'secondary',
        },
      ],
      _name: 'hero',
    },
  ],
})

editor.defineElement()
