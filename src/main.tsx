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
    new Checkbox('inversed', { label: 'Image à droite ?' }),
    new Repeater('steps', {
      title: 'Étapes',
      addLabel: 'Ajouter une étape',
      fields: [new Text('step', {})],
    }),
  ],
})
editor.registerComponent('html', {
  title: 'HTML',
  fields: [new HTMLText('html', { allowHeadings: true })],
})
editor.defineElement()
