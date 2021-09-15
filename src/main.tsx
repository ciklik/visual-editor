import {
  Checkbox,
  Number as NumberField,
  Repeater,
  Select,
  Text,
  VisualEditor,
} from 'src/VisualEditor'
import { HTMLText } from './fields/HTMLText'
import { Row } from './fields/Row'
import { Alignment } from './fields/Alignment'
import {
  ButtonField,
  Buttons,
  Content,
  IconsWithLabel,
  ImageField,
  SiteColor,
  Style,
  Title,
} from './shared'

let editor = new VisualEditor()

editor.registerComponent('columns-with-title', {
  title: 'Columns with title',
  fields: [
    new HTMLText('title', { label: 'Titre', multiline: false }),
    new Repeater('columns', {
      title: 'Colonnes',
      addLabel: 'Ajouter une colonne',
      fields: [
        ImageField('image', 'Image'),
        new HTMLText('body', { label: 'Contenu' }),
      ],
    }),
  ],
})

editor.registerComponent('hero-big', {
  title: 'Bannière',
  fields: [
    new Repeater('slides', {
      label: 'Slides',
      collapsed: 'title',
      min: 1,
      addLabel: 'Ajouter un slide',
      fields: [
        new Row(
          [
            SiteColor('backgroundColor', 'Fond'),
            SiteColor('textColor', 'Texte'),
            new Select('textPosition', {
              label: 'Position du text',
              default: 'center',
              options: [
                { label: 'Gauche', value: 'left' },
                { label: 'Centre', value: 'center' },
                { label: 'Droite', value: 'right' },
              ],
            }),
          ],
          { columns: '50px 50px 1fr' }
        ),
        Title(),
        Content(),
        ImageField('background', 'Fond'),
        ImageField('backgroundMobile', 'Fond (mobile)'),
        Buttons(),
      ],
    }),
  ],
})

editor.registerComponent('icons-columns', {
  title: 'Section avec icônes',
  fields: [
    Title(),
    Content(),
    ...Style(),
    new Select('layout', {
      label: 'Affichage',
      default: 'column',
      options: [
        { label: 'Colonnes', value: 'column' },
        { label: 'Grille', value: 'grid' },
        { label: 'Lignes', value: 'row' },
      ],
    }),
    new Repeater('columns', {
      label: 'Colonnes',
      collapsed: 'title',
      min: 1,
      addLabel: 'Ajouter une colonne',
      fields: [ImageField('icon', 'Icône'), Title(), Content()],
    }),
    Buttons(),
  ],
})

editor.registerComponent('title-icons-columns', {
  title: 'Section avec titre & icônes',
  fields: [
    Title(),
    ...Style(),
    new Repeater('columns', {
      label: 'Colonnes',
      collapsed: 'title',
      min: 1,
      addLabel: 'Ajouter une colonne',
      fields: [ImageField('icon', 'Icône'), Title(), Content()],
    }),
  ],
})

editor.registerComponent('newsletter', {
  title: 'Newsletter',
  fields: [Title(), Content(), ...Style()],
})

editor.registerComponent('testimonials', {
  title: 'Témoignages',
  fields: [
    ...Style(),
    new Repeater('columns', {
      label: 'Colonnes',
      collapsed: 'title',
      min: 1,
      addLabel: 'Ajouter un témoignage',
      fields: [ImageField('image', 'Image'), Title(), Content()],
    }),
  ],
})

editor.registerComponent('steps', {
  title: 'Etapes',
  fields: [
    ImageField(),
    Title(),
    new Text('caption', { label: "Mention sous l'image" }),
    new Row(
      [
        SiteColor('stepColor', 'Puces'),
        new Alignment('align', {
          label: "Position de l'image",
          default: 'right',
        }),
      ],
      { columns: '50px 1fr' }
    ),
    new Repeater('steps', {
      title: 'Étapes',
      addLabel: 'Ajouter une étape',
      min: 2,
      max: 4,
      fields: [Title('step')],
    }),
    ...Style(),
  ],
})

editor.registerComponent('bloc-centered', {
  title: 'Bloc centré',
  fields: [Title(), Content(), IconsWithLabel(), Buttons(), ...Style()],
})

editor.registerComponent('images-hoverable', {
  title: 'Images survolables',
  fields: [
    Title(),
    new Repeater('images', {
      title: 'Images',
      addLabel: 'Ajouter une image',
      min: 1,
      max: 3,
      fields: [ImageField(), Content()],
    }),
    ...Style(),
  ],
})

editor.registerComponent('user-ratings', {
  title: 'Evaluations',
  fields: [
    Title(),
    ...Style(),
    new Repeater('columns', {
      label: 'Colonnes',
      collapsed: 'title',
      min: 1,
      addLabel: 'Ajouter une colonne',
      fields: [
        ImageField('icon', 'Icône'),
        Title(),
        Content(),
        new NumberField('note', { label: 'Note / 5' }),
      ],
    }),
    Content(),
  ],
})

editor.registerComponent('news', {
  title: 'News',
  fields: [
    new Repeater('news', {
      label: 'News',
      collapsed: 'title',
      min: 1,
      addLabel: 'Ajouter une news',
      fields: [
        ImageField(),
        new Text('title', { label: 'Titre' }),
        new Text('category', { label: 'Catégorie' }),
        new Text('content', { label: 'Description', multiline: true }),
        new Text('url', { label: 'URL' }),
      ],
    }),
    SiteColor('categoryColor', 'Couleur de la catégorie'),
    ...Style(),
    Buttons(),
  ],
})

editor.registerComponent('cta-hover', {
  title: 'Call to action hover',
  fields: [
    Title(),
    Content(),
    new Select('textPosition', {
      label: 'Position du texte',
      default: 'center',
      options: [
        { label: 'Gauche', value: 'left' },
        { label: 'Centre', value: 'center' },
        { label: 'Droite', value: 'right' },
      ],
    }),
    Buttons(),
    ...Style(),
  ],
})

editor.registerComponent('alternate-icons', {
  title: 'Contenu alterné droite / gauche',
  fields: [
    Title(),
    new Repeater('items', {
      label: 'Blocs',
      collapsed: 'title',
      min: 1,
      addLabel: 'Ajouter un bloc',
      fields: [ImageField('icon', 'Icône'), Title(), Content()],
    }),
    ...Style(),
  ],
})

editor.registerComponent('text-image', {
  title: 'Texte avec image',
  fields: [
    ImageField(),
    new Alignment('align', {
      label: "Position de l'image",
      default: 'left',
    }),
    Title(),
    Content(),
    IconsWithLabel(),
    new Checkbox('checkicon', {
      label: 'Utiliser des check pour les listes',
    }),
    SiteColor('iconColor', 'Couleur des checkbox').when('checkicon', true),
    Buttons(),
    ...Style(),
  ],
})

editor.registerComponent('title-buttons', {
  title: 'Titre avec boutons à droite',
  fields: [Title(), Buttons(), ...Style()],
})

editor.registerComponent('images-carousel', {
  title: "Carrousel d'images",
  fields: [
    Title(),
    Content(),
    new Repeater('images', {
      label: 'Blocs',
      collapsed: 'title',
      min: 1,
      addLabel: 'Ajouter une image',
      fields: [ImageField(), new Text('title', { label: 'Titre' }), Content()],
    }),
    new NumberField('slidesVisible', {
      label: "Nombre d'éléments visible",
      default: 5,
    }),
    new NumberField('slidesToScroll', {
      label: "Nombre d'élément à faire défiler",
      default: 1,
      help: `Pour que la boucle fonctionne assurez vous que le nombre d'image soit un multiple de ce chiffre`,
    }),
    ...Style(),
  ],
})

editor.registerComponent('gallery', {
  title: "Galerie d'image",
  fields: [
    Title(),
    Content(),
    new Checkbox('highlight', { label: 'Mettre en avant la première image' }),
    new Checkbox('titleLeft', { label: 'Titre à gauche' }),
    new Text('facebook', { label: 'Facebook' }),
    new Text('instagram', { label: 'Instagram' }),
    new Text('pinterest', { label: 'Pinterest' }),
    new Checkbox('instagram', {
      label: 'Récupérer les images depuis instagram',
      default: false,
    }),
    new Repeater('images', {
      label: 'Blocs',
      collapsed: 'title',
      min: 1,
      addLabel: 'Ajouter une image',
      fields: [ImageField()],
    }).when('instagram', false),
    ...Style(),
  ],
})

editor.registerComponent('products', {
  title: 'Produits',
  fields: [
    Title(),
    Content(),
    Buttons(),
    new Repeater('products', {
      label: 'Produit',
      collapsed: 'title',
      min: 1,
      addLabel: 'Ajouter un produit',
      fields: [
        ImageField(),
        Title(),
        new Text('price', { label: 'Prix', default: 'X€ / mois' }),
        new Text('priceInfos', {
          label: 'Information sur le prix',
          default: 'Livraison inclue',
        }),
        new Text('arguments', {
          label: 'Arguments',
          default: 'Livraison inclue',
        }),
        new Text('infos', {
          label: 'Informations',
          default: 'Reconduit tous les mois',
        }),
        new Text('highlight', {
          default: 'Meilleur vente !',
          label: 'Libellé de mise en avant',
        }),
        ButtonField(),
      ],
    }),
  ],
})

editor.registerComponent('checklists', {
  title: 'Checklist',
  fields: [
    ...Style(),
    new Row([
      SiteColor('titleBackground', 'Couleur de fond du titre'),
      SiteColor('titleColor', 'Couleur de fond du titre'),
    ]),
    new Repeater('checklists', {
      label: 'Liste',
      collapsed: 'title',
      min: 1,
      addLabel: 'Ajouter une liste',
      fields: [
        Title(),
        ImageField(),
        new Repeater('items', {
          label: 'Elements',
          collapsed: 'title',
          min: 1,
          addLabel: 'Ajouter un élément',
          fields: [new Text('title', { label: 'Titre' })],
        }),
        new Repeater('disabledItems', {
          label: 'Elements désactivés',
          collapsed: 'title',
          min: 1,
          addLabel: 'Ajouter un élément',
          fields: [new Text('title', { label: 'Titre' })],
        }),
        new Checkbox('highlighted', { label: 'Produit mis en avant' }),
        new Text('highlightedText', {
          label: 'Libellé de la mise en avant',
        }).when('highlighted', true),
      ],
    }),
  ],
})

editor.registerComponent('stats', {
  title: 'Statistiques',
  fields: [
    new Repeater('items', {
      label: 'Elements désactivés',
      collapsed: 'title',
      min: 1,
      addLabel: 'Ajouter un élément',
      fields: [
        new Text('title', { label: 'title' }).when('hasImage', false),
        ImageField().when('hasImage', true),
        new Checkbox('hasImage', {
          label: 'Utiliser une image',
          default: false,
        }),
        Content(),
      ],
    }),
  ],
})

editor.registerComponent('carousel-text-image', {
  title: 'Carousel de texte avec image',
  fields: [
    new Repeater('items', {
      label: 'Slides',
      collapsed: 'title',
      min: 1,
      addLabel: 'Ajouter un slide',
      fields: [
        ImageField(),
        new Alignment('align', {
          label: "Position de l'image",
          default: 'left',
        }),
        Title(),
        Content(),
        IconsWithLabel(),
        new Checkbox('checkicon', {
          label: 'Utiliser des check pour les listes',
        }),
        SiteColor('iconColor', 'Couleur des checkbox').when('checkicon', true),
        Buttons(),
        ...Style(),
      ],
    }),
  ],
})

editor.defineElement()
