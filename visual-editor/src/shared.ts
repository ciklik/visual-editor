/**
 * This is a demo file demonstrating how to use the Editor with demo blocks
 * (it's not part of the library)
 */
import {
  ImageUrl,
  Row,
  Text,
  Select,
  Color,
  HTMLText,
  Repeater,
  Range,
  Tabs,
  TextAlign,
} from './VisualEditor'
import { FieldDefinition } from 'src/types'

export const Colors = [
  '--bs-blue',
  '--bs-indigo',
  '--bs-purple',
  '--bs-pink',
  '--bs-red',
  '--bs-orange',
  '--bs-yellow',
  '--bs-green',
  '--bs-teal',
  '--bs-cyan',
  '--bs-white',
  '--bs-gray',
  '--bs-gray-dark',
  '--bs-primary',
  '--bs-secondary',
  '--bs-success',
  '--bs-info',
  '--bs-warning',
  '--bs-danger',
  '--bs-light',
  '--bs-dark',
]

export const ImageField = (name: string = 'image', label: string = 'image') =>
  ImageUrl(name, {
    label: label,
    onBrowse: (url) => Promise.resolve('https://picsum.photos/425/458'),
  })

export const ButtonField = () =>
  Row([
    Text('label', { label: 'Label', default: 'Call to action' }),
    Text('url', { label: 'Link' }),
    Select('type', {
      default: 'primary',
      label: 'type',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
    }),
  ])

export const ColorField = (name: string, label: string) =>
  Color(name, { label: label, colors: Colors })

export const TitleField = (name = 'title', label = 'Titre') =>
  Row(
    [
      HTMLText(name, {
        default: 'Lorem ipsum dolor sit amet',
        label: label,
        multiline: false,
        colors: Colors,
      }),
      TextAlign(name + 'Align', {
        label: 'Alignment',
      }),
    ],
    { columns: '1fr max-content' }
  )

export const ContentField = (name = 'content', label = 'Description') =>
  HTMLText(name, {
    label: label,
    default:
      '<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>',
    multiline: true,
    colors: Colors,
    backgroundColor: 'backgroundColor',
    textColor: 'textColor',
    defaultAlign: 'titleAlign',
  })

export const ButtonsField = () =>
  Repeater('buttons', {
    label: 'Boutons',
    addLabel: 'Add a bouton',
    fields: [ButtonField()],
  })

export const Style = () => [
  Row(
    [
      ColorField('backgroundColor', 'Bg'),
      ColorField('textColor', 'Text'),
      ImageField('background', 'Background'),
      ImageField('backgroundMobile', 'Background (mobile)'),
    ],
    { columns: '50px 50px 1fr 1fr' }
  ),

  Row([
    Select('backgroundSize', {
      default: 'cover',
      label: 'Size',
      options: [
        { label: 'Cover', value: 'cover' },
        { label: 'Contain', value: 'contain' },
        { label: 'Original', value: 'auto' },
      ],
    }),
    Select('backgroundRepeat', {
      default: 'no-repeat',
      label: 'Repeat',
      options: [
        { label: 'None', value: 'no-repeat' },
        { label: 'x', value: 'repeat-x' },
        { label: 'y', value: 'repeat-y' },
        { label: 'x & y', value: 'repeat' },
      ],
    }),
    Select('backgroundXPosition', {
      default: 'center',
      label: 'Position (X)',
      options: [
        { label: 'Centrer', value: 'center' },
        { label: 'Gauche', value: 'left' },
        { label: 'Droite', value: 'right' },
      ],
    }),
    Select('backgroundYPosition', {
      default: 'center',
      label: 'Position (Y)',
      options: [
        { label: 'Centrer', value: 'center' },
        { label: 'Haut', value: 'top' },
        { label: 'Bas', value: 'bottom' },
      ],
    }),
  ]).when('background', (b: string) => b),
  Range('padding', { label: 'Padding vertical', default: 3 }),
]

export const WithStyles = (
  contentFields: FieldDefinition<any, any>[],
  styleFields: FieldDefinition<any, any>[] = []
) => {
  return [
    Tabs(
      {
        label: 'Content',
        fields: contentFields,
      },
      {
        label: 'Appearance',
        fields: [...styleFields, ...Style()],
      }
    ),
  ]
}
