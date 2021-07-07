import { VisualEditor } from './VisualEditor'
import { Text } from './fields/Text'
import { Button } from './fields/Button'
import { Repeater } from './fields/Repeater'
import { Checkbox } from './fields/Checkbox'
import { ImageUrl } from './fields/ImageUrl'
import { Color } from './fields/Color'

let editor = new VisualEditor()
const textPalette = ['--pink', '--purple', '--blue', '--green']
editor.registerComponent('hero', {
  title: 'Hero',
  fields: [
    new Text('title', { label: 'Titre' }),
    new Color('background', { label: 'Couleur de fond', colors: textPalette }),
    new Text('body', { label: 'Description', multiline: true }),
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
  fields: [
    new Color('color', { colors: textPalette, label: 'Couleur' }),
    new Text('html', { label: 'HTML', multiline: true }),
  ],
})
editor.defineElement()
