import {
  Checkbox,
  Number as NumberField,
  Repeater,
  Select,
  Tabs,
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
  Title, WithStyles,
} from './shared'

let editor = new VisualEditor()



editor.registerComponent("columns-with-title", {
  title: "Columns with title",
  fields: [
    new HTMLText("title", { label: "Titre", multiline: false }),
    new Repeater("columns", {
      title: "Colonnes",
      addLabel: "Ajouter une colonne",
      fields: [
        ImageField("image", "Image"),
        new HTMLText("body", { label: "Contenu" }),
      ],
    }),
  ],
});

editor.registerComponent("hero-big", {
  title: "Bannière",
  fields: [
    new Repeater("slides", {
      label: "Slides",
      collapsed: "title",
      min: 1,
      addLabel: "Ajouter un slide",
      fields: WithStyles(
        [
          Title(),
          new Range("titleSize", {
            min: 1,
            max: 5,
            default: 2,
            label: "Niveau de titre",
          }),
          Content(),
          new Text("video", { label: "Vidéo" }),
          Buttons(),
        ],
        [
          new Checkbox("flexButtons", {
            label: "Aligner les boutons sur une ligne",
          }),
          new Select("textPosition", {
            label: "Position du text",
            default: "center",
            options: [
              { label: "Gauche", value: "left" },
              { label: "Centre", value: "center" },
              { label: "Droite", value: "right" },
            ],
          }),
        ]
      ),
    }),
  ],
});

editor.registerComponent("icons-columns", {
  title: "Section avec icônes",
  fields: WithStyles(
    [
      Title(),
      Content(),
      new Repeater("columns", {
        label: "Colonnes",
        collapsed: "title",
        min: 1,
        addLabel: "Ajouter une colonne",
        fields: [ImageField("icon", "Icône"), Title(), Content()],
      }),
      Buttons(),
    ],
    [
      new Select("layout", {
        label: "Affichage",
        default: "column",
        options: [
          { label: "Colonnes", value: "column" },
          { label: "Grille", value: "grid" },
          { label: "Lignes", value: "row" },
        ],
      }),
    ]
  ),
});

editor.registerComponent("title-icons-columns", {
  title: "Section avec titre & icônes",
  fields: WithStyles([
    Title(),
    new Repeater("columns", {
      label: "Colonnes",
      collapsed: "title",
      min: 1,
      addLabel: "Ajouter une colonne",
      fields: [ImageField("icon", "Icône"), Title(), Content()],
    }),
  ]),
});

editor.registerComponent("newsletter", {
  title: "Newsletter",
  fields: WithStyles([Title(), Content()]),
});

editor.registerComponent("testimonials", {
  title: "Témoignages",
  fields: WithStyles([
    new Repeater("columns", {
      label: "Colonnes",
      collapsed: "title",
      min: 1,
      addLabel: "Ajouter un témoignage",
      fields: [ImageField("image", "Image"), Title(), Content()],
    }),
  ]),
});

editor.registerComponent("steps", {
  title: "Etapes",
  fields: WithStyles(
    [
      ImageField(),
      Title(),
      new Text("caption", { label: "Mention sous l'image" }),
      new Repeater("steps", {
        title: "Étapes",
        addLabel: "Ajouter une étape",
        min: 2,
        max: 4,
        fields: [Title("step", null)],
      }),
    ],
    [
      new Row(
        [
          SiteColor("stepColor", "Puces"),
          new Alignment("align", {
            label: "Position de l'image",
            default: "right",
          }),
        ],
        { columns: "50px 1fr" }
      ),
    ]
  ),
});

editor.registerComponent("bloc-centered", {
  title: "Bloc centré",
  fields: WithStyles([Title(), Content(), IconsWithLabel(), Buttons()]),
});

editor.registerComponent("images-hoverable", {
  title: "Images survolables",
  fields: WithStyles([
    Title(),
    new Repeater("images", {
      title: "Images",
      addLabel: "Ajouter une image",
      min: 1,
      max: 3,
      fields: [ImageField(), Content()],
    }),
  ]),
});

editor.registerComponent("user-ratings", {
  title: "Evaluations",
  fields: WithStyles([
    Title(),
    new Repeater("columns", {
      label: "Colonnes",
      collapsed: "title",
      min: 1,
      addLabel: "Ajouter une colonne",
      fields: [
        ImageField("icon", "Icône"),
        Title(),
        Content(),
        new NumberField("note", { label: "Note / 5" }),
      ],
    }),
    Content(),
  ]),
});

editor.registerComponent("news", {
  title: "News",
  fields: WithStyles(
    [
      new Repeater("news", {
        label: "News",
        collapsed: "title",
        min: 1,
        addLabel: "Ajouter une news",
        fields: [
          ImageField(),
          new Text("title", { label: "Titre" }),
          new Text("category", { label: "Catégorie" }),
          new Text("content", { label: "Description", multiline: true }),
          new Text("url", { label: "URL" }),
        ],
      }),
      Buttons(),
    ],
    [SiteColor("categoryColor", "Couleur de la catégorie")]
  ),
});

editor.registerComponent("cta-hover", {
  title: "Call to action hover",
  fields: WithStyles([
    Title(),
    Content(),
    new Select("textPosition", {
      label: "Position du texte",
      default: "center",
      options: [
        { label: "Gauche", value: "left" },
        { label: "Centre", value: "center" },
        { label: "Droite", value: "right" },
      ],
    }),
    Buttons(),
  ]),
});

editor.registerComponent("alternate-icons", {
  title: "Contenu alterné droite / gauche",
  fields: WithStyles([
    Title(),
    new Repeater("items", {
      label: "Blocs",
      collapsed: "title",
      min: 1,
      addLabel: "Ajouter un bloc",
      fields: [ImageField("icon", "Icône"), Title(), Content()],
    }),
  ]),
});

editor.registerComponent("text-image", {
  title: "Texte avec image",
  fields: WithStyles(
    [
      ImageField(),
      Title(),
      Content(),
      IconsWithLabel(),
      new Checkbox("checkicon", {
        label: "Utiliser des check pour les listes",
      }),
      Buttons(),
    ],
    [
      new Alignment("align", {
        label: "Position de l'image",
        default: "left",
      }),
      SiteColor("iconColor", "Couleur des checkbox").when("checkicon", true),
    ]
  ),
});

editor.registerComponent("title-buttons", {
  title: "Titre avec boutons à droite",
  fields: WithStyles([Title(), Buttons()]),
});

editor.registerComponent("images-carousel", {
  title: "Carrousel d'images",
  fields: WithStyles(
    [
      Title(),
      Content(),
      new Repeater("images", {
        label: "Blocs",
        collapsed: "title",
        min: 1,
        addLabel: "Ajouter une image",
        fields: [
          ImageField(),
          new Text("title", { label: "Titre" }),
          Content(),
        ],
      }),
    ],
    [
      new NumberField("slidesVisible", {
        label: "Nombre d'éléments visible",
        default: 5,
      }),
      new NumberField("slidesToScroll", {
        label: "Nombre d'élément à faire défiler",
        default: 1,
        help: `Pour que la boucle fonctionne assurez vous que le nombre d'image soit un multiple de ce chiffre`,
      }),
    ]
  ),
});

editor.registerComponent("gallery", {
  title: "Galerie d'image",
  fields: WithStyles(
    [
      Title(),
      Content(),
      new Checkbox("titleLeft", { label: "Titre à gauche" }),
      new Text("facebook", { label: "Facebook" }),
      new Text("instagram", { label: "Instagram" }),
      new Text("pinterest", { label: "Pinterest" }),
      new Checkbox("instagram", {
        label: "Récupérer les images depuis instagram",
        default: false,
      }),
      new Repeater("images", {
        label: "Blocs",
        collapsed: "title",
        min: 1,
        addLabel: "Ajouter une image",
        fields: [ImageField()],
      }).when("instagram", false),
    ],
    [
      new Checkbox("highlight", {
        label: "Mettre en avant la première image",
      }),
    ]
  ),
});

editor.registerComponent("products", {
  title: "Produits",
  fields: WithStyles([
    Title(),
    Content(),
    Buttons(),
    new Repeater("products", {
      label: "Produit",
      collapsed: "title",
      min: 1,
      addLabel: "Ajouter un produit",
      fields: [
        ImageField(),
        Title(),
        new Text("price", { label: "Prix", default: "X€ / mois" }),
        new Text("priceInfos", {
          label: "Information sur le prix",
          default: "Livraison inclue",
        }),
        new Text("arguments", {
          label: "Arguments",
          default: "Livraison inclue",
        }),
        new Text("infos", {
          label: "Informations",
          default: "Reconduit tous les mois",
        }),
        new Text("highlight", {
          default: "Meilleur vente !",
          label: "Libellé de mise en avant",
        }),
        ButtonField(),
      ],
    }),
  ]),
});

editor.registerComponent("checklists", {
  title: "Checklist",
  fields: WithStyles(
    [
      new Repeater("checklists", {
        label: "Liste",
        collapsed: "title",
        min: 1,
        addLabel: "Ajouter une liste",
        fields: [
          Title(),
          ImageField(),
          new Repeater("items", {
            label: "Elements",
            collapsed: "title",
            min: 1,
            addLabel: "Ajouter un élément",
            fields: [new Text("title", { label: "Titre" })],
          }),
          new Repeater("disabledItems", {
            label: "Elements désactivés",
            collapsed: "title",
            min: 1,
            addLabel: "Ajouter un élément",
            fields: [new Text("title", { label: "Titre" })],
          }),
          new Checkbox("highlighted", { label: "Produit mis en avant" }),
          new Text("highlightedText", {
            label: "Libellé de la mise en avant",
          }).when("highlighted", true),
        ],
      }),
    ],
    [
      new Row([
        SiteColor("titleBackground", "Couleur de fond du titre"),
        SiteColor("titleColor", "Couleur de fond du titre"),
      ]),
    ]
  ),
});

editor.registerComponent("stats", {
  title: "Statistiques",
  fields: [
    new Repeater("items", {
      label: "Elements désactivés",
      collapsed: "title",
      min: 1,
      addLabel: "Ajouter un élément",
      fields: [
        new Text("title", { label: "title" }).when("hasImage", false),
        ImageField().when("hasImage", true),
        new Checkbox("hasImage", {
          label: "Utiliser une image",
          default: false,
        }),
        Content(),
      ],
    }),
  ],
});

editor.registerComponent("carousel-text-image", {
  title: "Carousel de texte avec image",
  fields: WithStyles(
    [
      new Repeater("items", {
        label: "Slides",
        collapsed: "title",
        min: 1,
        addLabel: "Ajouter un slide",
        fields: [
          ImageField(),
          new Alignment("align", {
            label: "Position de l'image",
            default: "left",
          }),
          Title(),
          Content(),
          IconsWithLabel(),
          new Checkbox("checkicon", {
            label: "Utiliser des check pour les listes",
          }),
          Buttons(),
        ],
      }),
    ],
    [SiteColor("iconColor", "Couleur des checkbox").when("checkicon", true)]
  ),
});

editor.defineElement()
