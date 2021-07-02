import './css/style.scss'
import { VisualEditor } from './VisualEditor'
import { Text } from './fields/Text'

let editor = new VisualEditor()
editor.registerComponent('Bloc3Images', {
  title: 'Bloc avec 3 Images',
  fields: [
    new Text('title', { label: 'Titre' })
  ]
})
editor.defineElement()
