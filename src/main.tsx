import {
  Button,
  Checkbox,
  Color,
  ImageUrl,
  Repeater,
  Text,
  VisualEditor,
} from 'src/VisualEditor'
import { HTMLText } from './fields/HTMLText'
import { Row } from './fields/Row'
import { Alignment } from './fields/Alignment'

let editor = new VisualEditor()
const textPalette = ['--pink', '--purple', '--blue', '--green']

editor.registerComponent('hero', {
  title: 'Hero',
  fields: [
    new Row(
      [
        new HTMLText('title', {
          multiline: false,
          colors: textPalette,
        }),
        new Color('background', { colors: textPalette }),
      ],
      { columns: '1fr 1fr 40px', label: 'Titre' }
    ),
    new Checkbox('has_video', { label: 'A une vidéo ?' }),
    new Text('video', { label: 'URL de la vidéo' }).when('has_video', true),
    new Text('image', { label: "URL de l'image" }).when('has_video', false),
    new HTMLText('body', { label: 'Description', colors: textPalette }),
    new Repeater('actions', {
      title: 'Actions',
      addLabel: 'Ajouter un bouton',
      fields: [new Button('action')],
    }),
  ],
})
editor.registerComponent('steps', {
  title: 'Etapes',
  fields: [
    new ImageUrl('image', {
      label: 'Image',
      onBrowse: (url) => Promise.resolve('https://picsum.photos/425/458'),
    }),
    new Text('title', { label: 'Titre' }),
    new Text('caption', { label: "Mention sous l'image" }),
    new Alignment('align', {
      label: "Position de l'image",
      default: 'right',
    }),
    new Repeater('steps', {
      title: 'Étapes',
      addLabel: 'Ajouter une étape',
      min: 2,
      max: 4,
      fields: [new Text('step', {})],
    }),
  ],
})
editor.registerComponent('html', {
  title: 'HTML',
  fields: [new HTMLText('html', { allowHeadings: true })],
})
editor.defineElement()
