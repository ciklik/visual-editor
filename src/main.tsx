import './css/style.scss'
import { VisualEditor } from './VisualEditor'
import { Text } from './fields/Text'
import { Button } from './fields/Button'
import { Repeater } from './fields/Repeater'

let editor = new VisualEditor()
editor.registerComponent('hero', {
  title: 'Hero',
  fields: [
    new Text('title', { label: 'Titre' }),
    new Text('body', { label: 'Description', multiline: true }),
    new Repeater('actions', {
      title: 'Actions',
      addLabel: 'Ajouter un bouton',
      fields: [new Button('action')],
    }),
  ],
})
editor.registerComponent('demo', {
  title: 'Demo',
  fields: [
    new Text('title', { label: 'Titre' }),
    new Text('body', { label: 'Description', multiline: true }),
    new Repeater('columns', {
      title: 'Colonnes',
      addLabel: 'Ajouter une colonne',
      collapsed: 'title',
      fields: [
        new Text('title', { label: 'Titre' }),
        new Text('slug', { label: 'Slug' }),
        new Text('body', { label: 'Contenu', multiline: true }),
      ],
    }),
  ],
})
editor.defineElement()
