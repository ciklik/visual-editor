import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import '../../../visual-editor/dist/style.css'
import data from './data.json'
import {
  Color,
  HTMLText, ImageUrl,
  Repeater,
  Row,
  Select, Tabs,
  Text, TextAlign,
  VisualEditor,
} from '../../../visual-editor/dist/visual-editor.es.js'

export const Colors = [
  '--bs-blue:',
  '--bs-indigo',
  '--bs-purple',
  '--bs-pink',
  '--bs-red',
  '--bs-orange',
  '--bs-yellow',
  '--bs-green',
  '--bs-teal:',
  '--bs-cyan:',
  '--bs-white',
  '--bs-gray:',
  '--bs-gray-dark',
  '--bs-primary',
  '--bs-secondary',
  '--bs-success',
  '--bs-info:',
  '--bs-warning',
  '--bs-danger',
  '--bs-light',
  '--bs-dark',
]

export const ImageField = (name = 'image', label = 'image') =>
  new ImageUrl(name, {
    label: label,
    onBrowse: (url) => Promise.resolve('https://picsum.photos/425/458'),
  })

export const ButtonField = () =>
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

export const ColorField = (name, label) =>
  new Color(name, { label: label, colors: Colors })

export const TitleField = (name = 'title', label = 'Titre') =>
  new Row(
    [
      new HTMLText(name, {
        default: 'Lorem ipsum dolor sit amet',
        label: label,
        multiline: false,
        colors: Colors,
      }),
      new TextAlign(name + 'Align', {
        label: 'Alignement',
      }),
    ],
    { columns: '1fr max-content' }
  )

export const ContentField = (name = 'content', label = 'Description') =>
  new HTMLText(name, {
    label: label,
    default:
      '<p>Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet.</p>',
    multiline: true,
    colors: Colors,
  })
    .background('backgroundColor')
    .color('textColor')

export const ButtonsField = () =>
  new Repeater('buttons', {
    title: 'Boutons',
    addLabel: 'Ajouter un bouton',
    fields: [ButtonField()],
  })

export const Style = () => [
  new Row(
    [
      ColorField('backgroundColor', 'Fond'),
      ColorField('textColor', 'Texte'),
      ImageField('background', 'Fond'),
      ImageField('backgroundMobile', 'Fond (mobile)'),
    ],
    { columns: '50px 50px 1fr 1fr' }
  ),

  new Row([
    new Select('backgroundSize', {
      default: 'cover',
      label: 'Taille',
      options: [
        { label: 'Remplir', value: 'cover' },
        { label: 'Contenir', value: 'contain' },
        { label: 'Original', value: 'auto' },
      ],
    }),
    new Select('backgroundRepeat', {
      default: 'no-repeat',
      label: 'Répétition',
      options: [
        { label: 'Aucune', value: 'no-repeat' },
        { label: 'x', value: 'repeat-x' },
        { label: 'y', value: 'repeat-y' },
        { label: 'x & y', value: 'repeat' },
      ],
    }),
    new Select('backgroundXPosition', {
      default: 'center',
      label: 'Position (X)',
      options: [
        { label: 'Centrer', value: 'center' },
        { label: 'Gauche', value: 'left' },
        { label: 'Droite', value: 'right' },
      ],
    }),
    new Select('backgroundYPosition', {
      default: 'center',
      label: 'Position (Y)',
      options: [
        { label: 'Centrer', value: 'center' },
        { label: 'Haut', value: 'top' },
        { label: 'Bas', value: 'bottom' },
      ],
    }),
  ]).when('background', (b) => b),
  new Range('padding', { label: 'Padding vertical', default: 3 }),
]

export const WithStyles = (
  contentFields,
  styleFields = []
) => {
  return [
    new Tabs(
      {
        label: 'Contenu',
        fields: contentFields,
      },
      {
        label: 'Apparence',
        fields: [...styleFields, ...Style()],
      }
    ),
  ]
}



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

editor.registerComponent('text', {
  title: 'Formatted text',
  fields: [ContentField()],
})

editor.defineElement()

export function EditorDemo () {
  const [editorVisibility, setEditorVisibility] = useState('hidden')
  const ref = useRef()

  useEffect(() => {
    ref.current.addEventListener('veClose', () => setEditorVisibility('hidden'))
  }, [ref.current])
  return <>
    <button className="button button--secondary" onClick={() => setEditorVisibility(v => v === undefined ? 'hidden' : undefined)}>
      Test the editor
    </button>
    {ReactDOM.createPortal(
      <div style={{zIndex: 9999, position: 'relative', isolation: 'isolate'}}>
          <visual-editor
          hidden={editorVisibility}
          name='content'
          preview='/preview.html'
          iconsUrl='/[name].svg'
          value={JSON.stringify(data)}
          ref={ref}
          />
      </div>,
      document.body
    )}
    </>
}
